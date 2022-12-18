use std::io::Write;

use crate::website::config::Config;
use crate::website::Website;

mod website;

#[tokio::main]
async fn main() {
    env_logger::init();
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
            let config = Config::default().await;
            Website::generate(&config).expect("[WEBSITE ERROR] Could not generate website");
        }
        _ => unreachable!("clap should ensure we don't get here"),
    };
}
