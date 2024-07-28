mod account;
mod config;
mod eatinator;
mod error;
mod vendor;

use config::Config;
use eatinator::Eatinator;
use error::Error;
use tracing::{event, Level};
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;
use tracing_subscriber::{filter, Layer};

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Initialize a basic configuration
    // This will default to production mode if not explicitly set
    let config = Config::new();
    // Initialize tracing based on the configuration
    let filter_level = match config.mode {
        config::Mode::Development => filter::LevelFilter::DEBUG,
        config::Mode::Production => filter::LevelFilter::INFO,
    };
    // Target stdout for logging
    let stdout_log = tracing_subscriber::fmt::layer();
    tracing_subscriber::registry()
        .with(stdout_log.with_filter(filter_level))
        .init();
    event!(Level::DEBUG, "Tracing initialized");
    event!(
        Level::INFO,
        "Eatinator configured for {:?} mode",
        config.mode
    );
    // Initialize the application
    Eatinator::new(config) // Create a new instance of the application
        .init_db() // Initialize the database connection
        .await?
        .collect_records() // Collect the records from the enabled vendors
        .await?;
    Ok(())
}
