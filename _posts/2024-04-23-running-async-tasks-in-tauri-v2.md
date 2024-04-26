---
title: "Long-running backend async tasks in tauri v2"
slug: "long-running-backend-async-tasks-in-tauri-v2"
summary: "How to run backend async tasks in tauri v2 and push data to the frontend"
---

## Introduction

Welcome to our tutorial on running backend async tasks in [Tauri v2](https://beta.tauri.app) and seamlessly pushing data to the frontend! In this guide, we'll delve into the process of orchestrating asynchronous backend operations while synchronously updating the frontend. Our example project revolves around crafting a Twitch Chat application, where we'll establish a connection to Twitch's IRC, fetch messages, and dynamically present them within our application interface.

The core of our approach lies in leveraging Tauri's robust event system to seamlessly bridge the gap between backend processes and frontend presentation. By the end of this tutorial, you'll have a clear understanding of how to synchronize backend async tasks with frontend data updates, empowering you to build responsive and dynamic applications with Tauri.

## Initializing Project

To kickstart our journey, ensure you have Tauri v2 and its associated tooling installed. If not, you can swiftly set it up by installing create-tauri-app using Cargo:

```shell
cargo install create-tauri-app
```

Then, initialize your Tauri application using:

```shell
cargo create-tauri-app --beta
```

While we'll be utilizing React for the frontend in this tutorial, feel free to adapt the frontend framework of your choice. The crux of our focus, however, will lie in configuring and executing backend tasks efficiently.

**[Explore alternative installation methods via Tauri's official documentation](https://beta.tauri.app/start/create-project/)**

For a visual walkthrough of the setup process, watch the following clip:

<script src="https://asciinema.org/a/Y14AWJ8No92Hm4upWYawQmeOJ.js" id="asciicast-656442" async="true"></script>

## Sending Data from Backend

Now that our project is primed, let's dive into creating long-running async tasks capable of dispatching data to the frontend. Our objective? Establish a connection to Twitch's chat service, continuously fetch incoming messages, and seamlessly relay them to our application's frontend.

We'll achieve this by spawning an async task that orchestrates the connection to Twitch's IRC, diligently processing incoming messages. Additionally, we'll equip this task with the capability to dispatch these messages to the frontend using event handlers.

To streamline your setup, we'll specify the necessary dependencies, demonstrate how to initialize the Twitch IRC connection within the chat module, and configure the Tauri builder to seamlessly integrate our newly minted chat module.

Add `twitch-irc` as a dependency in `src-tauri/Cargo.toml`. Here's all the dependencies we have at this point:

```toml
[build-dependencies]
tauri-build = { version = "2.0.0-beta", features = [] }

[dependencies]
tauri = { version = "2.0.0-beta", features = [] }
tauri-plugin-shell = "2.0.0-beta"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
twitch-irc = "5.0.1"
```

Next, we'll add basic functionality for connecting to a target channel and reading the chat. The code is mostly just copied from the example on the [twitch-irc README](https://github.com/robotty/twitch-irc-rs/).

The setup itself is meant to be called within an async task, and it will also spawn a second async task which bubble data up to our handler

```rust
use tauri::{async_runtime, EventTarget};
use tauri::{AppHandle, Manager};
use twitch_irc::login::StaticLoginCredentials;
use twitch_irc::message::ServerMessage;
use twitch_irc::ClientConfig;
use twitch_irc::SecureTCPTransport;
use twitch_irc::TwitchIRCClient;

#[derive(Clone, serde::Serialize)]
struct TwitchMessagePayload {
    id: String,
    text: String,
    sender: String,
    channel: String,
}

pub async fn monitor_chat(
    handle: &AppHandle,
    target_channel: String,
) -> Result<(), Box<(dyn std::error::Error + 'static)>> {
    let config = ClientConfig::default();
    let (mut incoming_messages, client) =
        TwitchIRCClient::<SecureTCPTransport, StaticLoginCredentials>::new(config);

    let twitch_chat_app_handler = handle.clone();
    let join_handle = async_runtime::spawn(async move {
        let handler = twitch_chat_app_handler;
        while let Some(message) = incoming_messages.recv().await {
            match message {
                ServerMessage::Privmsg(msg) => {
                    let payload = TwitchMessagePayload {
                        id: msg.message_id,
                        text: msg.message_text,
                        sender: msg.sender.login,
                        channel: msg.channel_login,
                    };
                    let _result =
                        handler.emit_to(EventTarget::app(), "twitch_message_received", payload);
                }
                _ => {}
            }
        }
    });

    client.join(target_channel).unwrap();
    join_handle.await.unwrap();
    Ok(())
}
```

Lastly, we're going to have tauri run this function. We could have the function run right when tauri starts up, but we'll more than likely miss the first set of messages before the frontend instantiates. To add a bit more control, we're going to wait for a call from the frontend to let us know when it's ready to receive messages as well as **who** to receive messages from, which will be useful for flexibility.

`TODO: Add handler code`

## Displaying Data with Frontend

`TODO: Show how to start listening for events in React`

## Conclusion

In summary, we've embarked on a journey to synchronize backend async tasks with frontend data presentation using Tauri v2. By crafting a Twitch Chat application, we've learned to orchestrate long-running tasks, seamlessly dispatch data to the frontend, and foster dynamic user experiences.
