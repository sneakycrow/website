use std::fs;

use serde::Deserialize;

#[derive(Deserialize)]
pub(crate) struct Config {
    pub(crate) output_directory: String,
    pub(crate) title: String,
    pub(crate) subtitle: String,
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
            title: config.title,
            subtitle: config.subtitle,
        }
    }
}
