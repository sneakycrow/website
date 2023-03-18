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

[axum]:https://github.com/tokio-rs/axum

[polars]:https://pola.rs

[twitch]:https://twitch.rs