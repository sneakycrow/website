use std::fs;

use serde::Deserialize;

#[derive(Deserialize)]
pub(crate) struct Config {
    pub(crate) output_directory: String,
}

impl Config {
    pub(crate) fn default() -> Self {
        // Read in configuration file for various settings
        let config_file =
            fs::read_to_string("config.toml").expect("[CONFIG ERROR] Could not read in config");
        let config: Config =
            toml::from_str(&config_file).expect("[CONFIG ERROR] Could not parse config from file");
        Config {
            output_directory: config.output_directory,
        }
    }
}
