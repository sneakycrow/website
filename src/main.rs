use tracing::{event, span, Level};
use tracing_subscriber::EnvFilter;

use crate::website::config::Config;
use crate::website::Website;

mod website;

#[tokio::main]
async fn main() {
    // Initialize environment logger for all macros to use
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .with_env_filter(EnvFilter::from_default_env())
        .init();
    span!(Level::INFO, "Starting up...");
    let cmd = clap::Command::new("crow")
        .bin_name("crow")
        .subcommand_required(true)
        .subcommand(
            clap::command!("build").arg(
                clap::arg!(--"out" <PATH>)
                    .value_parser(clap::value_parser!(std::path::PathBuf))
                    .default_value("_out"),
            ),
        );
    let matches = cmd.get_matches();
    match matches.subcommand() {
        Some(("build", _)) => {
            event!(Level::TRACE, "Generating website configuration");
            let config = Config::default()
                .await
                .expect("Could not create website configuration");

            event!(Level::INFO, "Starting website generation");
            Website::generate(config)
                .await
                .expect("[WEBSITE ERROR] Could not generate website");
        }
        _ => unreachable!("clap should ensure we don't get here"),
    };
}
