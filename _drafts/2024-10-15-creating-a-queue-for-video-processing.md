---
title: "creating a queue for video processing"
category: "tech"
summary: "Using Rust and Postgres, we'll create a queue system for our video processing pipeline"
---
### intro
In our [previous post](https://sneakycrow.dev/blog/2024-10-13-creating-a-small-video-streaming-service)
we created a function that can process a video into a stream, and some routes for serving those
static files. The problem with doing this within the API is it can take up a lot of resources. Ideally, we want to offload these
resources.

So, what we're going to do in this article is create a queue system that can run our jobs. We'll create a basic queue with an initial job type of
`PROCESS_VIDEO`, represent processing a video into our raw stream. A goal of this method is to understand simple queueing systems, but also to take
advantage of common resources your small projects probably already have access to, like a database.

This queue system will use Postgres to manage jobs, and will take advantage of `UPDATE SKIP FOR LOCKED` when querying for jobs
to add some concurrency.

This is largely inspired by [Sylvain Kerkour's post on creating a job queue system in Rust](https://kerkour.com/rust-job-queue-with-postgresql),
but slightly modified for our purposes. We're mostly focusing on the high level of moving a video processing job through our pipeline. If you'd
like a better analysis on the queue itself, I recommend reading [their article](https://kerkour.com/rust-job-queue-with-postgresql).
