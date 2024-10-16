---
title: "Creating a queue for video processing"
category: "tech"
summary: "Using Rust and Postgres, we'll create a queue system for our video processing pipeline"
---
## intro

In our [previous post](https://sneakycrow.dev/blog/2024-10-13-creating-a-small-video-streaming-service)
we created a function that can process a video into a stream, and some routes for serving those
static files. The problem with doing this within the API is it can take up a lot of resources.
Ideally, we want to offload these resources.

So, what we're going to do in this article is create a queue system that can run our jobs.
We'll create a basic queue with an initial job type of `ProcessRawVideo`, represent processing a video into our raw stream.
This queue system will use Postgres to manage jobs, and will take advantage of `SKIP LOCKED` when querying for jobs
to add some concurrency.

This is largely inspired by [Sylvain Kerkour's post on creating a job queue system in Rust](https://kerkour.com/rust-job-queue-with-postgresql),
but slightly modified for our purposes. We're mostly focusing on the high level of moving a
video processing job through our pipeline. If you'd like a better analysis on the queue itself,
I recommend reading [their article](https://kerkour.com/rust-job-queue-with-postgresql).

## creating the queue

Our queue is largely made of three core entities: the queue itself, the jobs it processes, and
the runners that execute the job. We want to to be able to push and pull jobs to our queue, and we want to be able
run several jobs concurrently.

We're going to use Postgres to store jobs to be processed. And when we query postgres
we'll use the `SKIP LOCKED` mechanism to give us concurrency within our workers.
We'll also add some retry mechanisms for retrying failed jobs.

### depdencies

We'll mostly be using sqlx for it's simplicity here, but this should be fairly interchangable with
whatever library you're using.

Here's our `Cargo.toml` depdendencies

```toml Cargo.toml
tokio = { version = "1", features = ["full"] }
sqlx = { version = "0.7", features = [
    "runtime-tokio-rustls",
    "postgres",
    "chrono",
    "uuid",
    "json",
] }
chrono = "0.4"
uuid = { version = "1", features = ["serde", "v4"] }
async-trait = "0.1"
serde = { version = "1", features = ["derive"] }
thiserror = "1"
anyhow = "1"
ulid = { version = "1", features = ["uuid"] }
futures = "0.3"
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }
```

### migrations

We'll want to create two tables, our main one is for managing the jobs, but we also want to update our videos. In our videos
table, we want to track where the raw video is located, whether it's been processed, and then standard stuff like an ID and
timestamps.

TODO: Add migration for videos
TODO: Add migration for queue

### db module

This module holds our function for creating a database connection pool

```rust db.rs
use sqlx::postgres::PgPool;

/// Function to establish a connection to the PostgreSQL database
pub async fn connect_to_database() -> Result<PgPool, sqlx::Error> {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    tracing::debug!("Creating DB connection Pool");
    let pool = PgPool::connect(&database_url).await?;

    Ok(pool)
}
```

### error module

I like to create a high level error module for my applications to re-use across my workspace. This is optional, but largely
used in the examples below.

```rust error.rs
#[derive(thiserror::Error, Debug, Clone)]
pub enum Error {
    #[error("Bad config: {0}")]
    BadConfig(String),
    #[error("Connecting to database: {0}")]
    ConnectingToDatabase(String),
    #[error("Internal error: {0}")]
    Internal(String),
    #[error("Not found: {0}")]
    NotFound(String),
    #[error("Migrating database: {0}")]
    DatabaseMigration(String),
    #[error("Invalid job message: {0}")]
    InvalidJobMessage(String),
    #[error("Video Processing: {0}")]
    VideoProcessingError(String),
}

impl std::convert::From<sqlx::Error> for Error {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::RowNotFound => Error::NotFound("row not found".into()),
            _ => Error::Internal(err.to_string()),
        }
    }
}

impl std::convert::From<sqlx::migrate::MigrateError> for Error {
    fn from(err: sqlx::migrate::MigrateError) -> Self {
        Error::DatabaseMigration(err.to_string())
    }
}
```

### queue module

This is the primary module for this article. We're going to define a trait that's our base queue,
and then implement that trait into a `PostgresQueue`. By having the queue itself be a trait we could
use different configurations, like if we moved to a different backend for managing the queue parts.

Our queue needs to be able to push jobs, pull jobs, fails jobs, delete jobs, and clear the queue. All work together
to manage the queue itself.

Before we define the queue, which will hold jobs, we need to define what a `Job` is. A job should have a unique identifier
and some kind of message with a payload to run it. For now, we only need a `ProcessRawVideo` payload, but we'll have this
be a member of an enum representing all payloads called `Message`.

Our specific message for processing a video will accept a `video_id` and a `path`. Presumably, the path itself

```rust lib.rs
/// The job to be processed, containing the message payload
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Job {
    pub id: Uuid,
    pub message: Message,
}

/// The payload of the job, containing the different jobs and their required data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Message {
    /// Our primary processing job
    /// Takes in a raw video (mp4) and converts it into an HLS stream
    // NOTE: We intentionally have the user provide the path to save us a db query to get it, but we
    // need a db query after processing to update the job status
    ProcessRawVideo { path: String, video_id: String },
}
```

```rust lib.rs
#[async_trait::async_trait]
pub trait Queue: Send + Sync + Debug {
    /// pushes a job to the queue
    async fn push(
        &self,
        job: Message,
        scheduled_for: Option<chrono::DateTime<chrono::Utc>>,
    ) -> Result<(), Error>;
    /// pull fetches at most `number_of_jobs` from the queue.
    async fn pull(&self, number_of_jobs: i32) -> Result<Vec<Job>, Error>;
    /// deletes a job from the queue
    async fn delete_job(&self, job_id: Uuid) -> Result<(), Error>;
    /// fails a job in the queue
    async fn fail_job(&self, job_id: Uuid) -> Result<(), Error>;
    /// clears the queue
    async fn clear(&self) -> Result<(), Error>;
}
```
