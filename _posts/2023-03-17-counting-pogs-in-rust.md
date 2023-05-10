---
title: "Counting Pogs on Twitch in Rust, part 1"
category: "software"
summary: "I wrote an application for processing and analyzing twitch chat to enable custom near real-time interactions"
series_key: "counting-pogs"
series_pos: 1
---

In 2022 I started creating a new secret project that's still in the works, but _part_ of this project is basically
counting the amount of times a user says a specific word in [Twitch][twitch] chat.

I used a combination of an [axum][axum] http server, a twitch irc bot, a tracing library, and [polars][polars] for
processing.

## TLDR how?

There's a few technical layers to this application. The first part is we create a bot to connect to the twitch chat.
Every time a user sends a message, we log that message to our tracing library. In our tracing library, we configure it
to write a specific tracing layer `chat_messages` to a log.

The next part is configuring an http server using [axum][axum]. It has a route that can receive events to process the
logs. Using [polars][polars], we'll read the logs into memories and parse them. We'll do this in fairly performant and
asynchronous way as well.

## connect to twitch chat with [twitch-irc][twitch-irc]

[twitch-irc][twitch-irc] is a nice little package that makes it incredibly easy to connect to a twitch chat. If you're
only acting as a receiver (not sending messages), you don't need to create any authentication tokens/configurations.

For this part, we'll just create an asynchronous function that we can call to connect to the twitch chat and starting
receiving a function. You basically just need the example in the [README][twitch-irc], but we're going to add
a [tracing][tracing] library for logging each message to. Each of these messages, using
the [tracing_appender][tracing_appender] so that each log can get appended to a rolling hourly log file.

Here's the dependencies to run the code below

```toml
[dependencies]
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter", "json", "time"] }
twitch-irc = { version = "5.0.0", features = ["refreshing-token-rustls-native-roots"] }
tokio = { version = "1.26.0", features = ["full"] }
tracing-appender = "0.2"
```

And here's the code to connect to your favorite streamer sodapoppin! (lots of data)

```rust
use twitch_irc::login::StaticLoginCredentials;
use twitch_irc::TwitchIRCClient;
use twitch_irc::{ClientConfig, SecureTCPTransport};

const STREAMER: &str = "sodapoppin";

#[tokio::main]
pub async fn main() {
    // Initialize tracing subscriber
    // This is our appender, it should end up creating a file at, relative to the cwd, `_data/messages/sodapoppin/chat_messages-{timestamp}`.
    // This will hold the message including the fields we specified, as well as a timer to check performance, a target to validate tracing channel,
    // and finally converting all that to a flattened json line.
    let file_appender = tracing_appender::rolling::hourly(format!("_data/messages/{}", STREAMER), "chat_messages");
    let (non_blocking, _guard) = tracing_appender::non_blocking(file_appender);
    tracing_subscriber::fmt()
        .with_target(true)
        .with_timer(tracing_subscriber::fmt::time::time())
        .json()
        .flatten_event(true)
        .with_writer(non_blocking)
        .init();
    // initializes the bot configuration
    let bot_config = ClientConfig::default();
    let (mut incoming_messages, client) =
        TwitchIRCClient::<SecureTCPTransport, StaticLoginCredentials>::new(bot_config);

    // Create the handler for receiving messages. This is where you can configure what to do with a message
    let join_handle = tokio::spawn(async move {
        while let Some(message) = incoming_messages.recv().await {
            event!(
                target: "chat_messages", // this is important to isolate messages in our log
                Level::INFO, // you can change this to another level, its fairly arbitrary for this use case
                channel = msg.channel_login,
                sender = msg.sender.name,
                message = msg.message_text,
                server_timestamp = msg.server_timestamp.to_string(), // It's useful to track this to track time between message posting and processing
                id = msg.message_id,
            );
        }
    });

    // Tell our client to initialize the connection to sodapoppin
    client.join(STREAMER.to_owned()).unwrap();

    // initialize our message receiver
    join_handle.await.unwrap();
}
```

## creating an axum server

_Note: I am creating a second binary for this part. I usually use Cargo workspaces to manage the project, but you do you
boo. I use the bot as a "collector" and this http server as a "processor"_

The next part is to initialize a processing layer. This layer will be able to read our JSON logs and process them based
on options we should be able to configure.
We'll create an axum server to act as our communication layer into this binary. The axum server will be able to receive
requests that ask for processing. We'll also equip this http layer with tracing because tracing is awesome and it's
useful for debugging.

Here's the dependencies I used for the code below:

```toml
[package]
name = "processor"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
axum = { version = "0.6", features = ["macros", "json"] }
tokio = { version = "1.25", features = ["full"] }
tower-http = { version = "0.4", features = ["trace"] }
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
polars = { version = "0.27.2", features = ["lazy", "dynamic_groupby", "json", "strings", "dtype-date"] }
```

And here's the http server I created. It has a root route that is mostly for me debugging its alive at all. I also have
a status route...which is basically the same thing (I realize as I type this out). The status route is what I personally
use for health checks, but it can supply useful data, highly recommend

It also adds tracing similar to how we do the bot/processor, and a utility dynamic port function. That function just
checks to see whether the `PORT` environment variable is set, otherwise it falls back to the default (8000).

```rust
use std::env;
use std::net::SocketAddr;

use axum::routing::{get, post};
use axum::Router;
use tower_http::trace;
use tower_http::trace::TraceLayer;
use tracing::{info, Level};
use tracing_subscriber::EnvFilter;

// mod event;

const DEFAULT_PORT: &str = "8000";

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    // Initialize tracer
    tracing_subscriber::fmt()
        .with_target(true)
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    // Initialize router for api
    let app = Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .route("/status", get(|| async { "Solid." }))
        // .route("/event", post(event::post_event))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(trace::DefaultMakeSpan::new().level(Level::INFO))
                .on_response(trace::DefaultOnResponse::new().level(Level::INFO)),
        );

    // Create address based on localhost and specified port
    let addr = SocketAddr::from(([0, 0, 0, 0], get_port()));

    // Start axum server on specified address
    info!("Binding to http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}

/// Function for dynamically gathering the port based on the PORT env variable or falling back to the DEFAULT_PORT
fn get_port() -> u16 {
    env::var("PORT")
        .unwrap_or(DEFAULT_PORT.to_string())
        .parse()
        .expect("Need a number for the port")
}
```

I also added, and commented out, the events route and the events mod, which is going to have the [polars][polars]
processing it. I'm going to add that section in a part 2 because its fun to talk about, but if you want a skeleton I
actually posted some unfinished, but good, code in [beautiful rust][beautiful rust].

[axum]:https://github.com/tokio-rs/axum

[polars]:https://pola.rs

[twitch]:https://twitch.rs

[twitch-irc]:https://crates.io/

[join-all-docs]:https://docs.rs/futures/latest/futures/future/fn.join_all.html

[tracing]:https://docs.rs/tracing/latest/tracing

[tracing_appender]:https://docs.rs/tracing-appender/latest/tracing_appender/index.html

[beautiful rust]:https://sneakycrow.dev/blog/2023-03-16-beautiful-rust
