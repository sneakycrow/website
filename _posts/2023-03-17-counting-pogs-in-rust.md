---
title: "Counting Pogs on Twitch in Rust"
category: "software"
summary: "I wrote an application for processing and analyzing twitch chat to enable custom near real-time interactions"
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

_Note: I am creating a second binary for this part. I use the bot as a "collector" and this http server as a "
processor"_

[axum]:https://github.com/tokio-rs/axum

[polars]:https://pola.rs

[twitch]:https://twitch.rs

[twitch-irc]:https://crates.io/

[join-all-docs]:https://docs.rs/futures/latest/futures/future/fn.join_all.html

[tracing]:https://docs.rs/tracing/latest/tracing

[tracing_appender]:https://docs.rs/tracing-appender/latest/tracing_appender/index.html