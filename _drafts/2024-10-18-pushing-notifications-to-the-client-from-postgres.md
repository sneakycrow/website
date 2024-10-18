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
