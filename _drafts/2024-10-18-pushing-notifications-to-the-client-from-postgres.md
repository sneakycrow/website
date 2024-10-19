---
title: "pushing notifications to the client from Postgres"
category: "tech"
series_key: "video-streaming-devlog"
series_pos: 2
---
In our [last post](https://sneakycrow.dev/blog/2024-10-15-creating-a-queue-for-video-processing) we created a queue system to offload processing of our raw videos from the API. But, in doing so, we
made it so the API returns the response well before the video is done processing.

Now, we need a way to communicate back to the client when a video is done processing. We'll achieve this by taking advantage
of a Postgres' [LISTEN](https://www.postgresql.org/docs/current/sql-listen.html) directive.

We're going to create a trigger that watches for updates to the `processing_status` column on the `videos` table
we created. Then, we'll create a websockets connection from client to server, and when we receive a notification
from Postgres for the requested video, we pass that notification to the websockets client.

### Setting up websockets

First, we'll want to establish a means of communication between our API and the web client.
For this tutorial, we're using [axum](https://github.com/tokio-rs/axum) and [askama](https://github.com/djc/askama),
but this should work with any frontend and any framework that supports websockets.
The reason we're using websockets is mainly so we can push an event from the server to the client, instead of
making the client request the event.

We'll create a new route and handler for the websockets connection called `/events`

```rust main.rs
// ... omitted for brevity
.route("/events", get(event_handler))
// ... omitted for brevity
```

And then we create a handler that upgrades the websocket connection and passes it to another handler function that can utilize
the socket.

```rust main.rs
pub async fn event_handler(
    ws: WebSocketUpgrade,
    State(state): State<Arc<AppState>>,
) -> impl IntoResponse {
    ws.on_upgrade(|socket| handle_socket(socket, state))
}
```

Alright, admittedly this part is a little confusing. But bear with me 🐻. What we need to do is create two "connections", and then
link those connections together. One connection will be communicating with Postgres and listening for notifications.
When it receives a notification, it'll parse it and pass it to the websockets connection, which will then push it to the client.

We'll start by defining the senders/receivers, one for the websockets connection (using the socket) and another one for Postgres
using a broadcast channel.

_Note: Broadcast sends all messages to **every** receiver. You'll want to probably modify some of this behavior for production
settings_

```rust events.rs
/// A websocket handler that passes upload_status events to the client
/// NOTE: This currently sends _all_ notifications to the subscribed client
/// TODO: Add authorization and filter only events the client cares about
async fn handle_socket(socket: WebSocket, state: Arc<AppState>) {
    // Split our websocket sender/receiver for communication with the client
    let (mut sender, mut receiver) = socket.split();

    // Create a new sender/receiver for sending/receiving events from Postgres
    let (ev_sender, mut ev_receiver): (broadcast::Sender<Event>, broadcast::Receiver<Event>) =
        broadcast::channel(100); // You can probably reduce this, I just pulled it from an example

    // ... omitted for brevity
}
```
