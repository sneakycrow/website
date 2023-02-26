use std::fs;

use serde::Deserialize;
use tracing::{event, span, Level};

use crate::website::project::Project;
use crate::website::signal_boost::SignalBoost;

const DEFAULT_OUTPUT: &str = "_out";

#[derive(Debug)]
pub(crate) struct Config {
    pub(crate) output_directory: String,
    pub(crate) title: String,
    pub(crate) subtitle: String,
    pub(crate) projects: Vec<Project>,
    pub(crate) boosts: Vec<SignalBoost>,
}

#[derive(Deserialize)]
struct TomlConfig {
    pub(crate) output_directory: Option<String>,
    pub(crate) title: String,
    pub(crate) subtitle: String,
    github_projects: Option<Vec<Project>>,
    boosts: Option<Vec<SignalBoost>>,
}

impl Config {
    /// Generates data from the local config file
    pub(crate) async fn default() -> Result<Self, std::io::Error> {
        span!(Level::DEBUG, "Generating default configuration");
        let local_config = Self::from_config_file();
        let github_projects: Vec<Project> = local_config.github_projects.unwrap_or(vec![]);
        let mut projects = vec![];

        match Project::get_github_client() {
            Ok(client) => {
                event!(
                    Level::DEBUG,
                    "Generated GitHub client. Downloading projects"
                );
                for project in github_projects.into_iter() {
                    projects.push(Project::download(project.repository, &client).await)
                }
            }
            Err(e) => {
                event!(
                    Level::ERROR,
                    "Could not generate Github client, skipping project download. Error {:?}",
                    e
                );
            }
        };

        let config = Config {
            projects,
            title: local_config.title,
            subtitle: local_config.subtitle,
            boosts: local_config.boosts.unwrap_or(vec![]),
            output_directory: local_config
                .output_directory
                .unwrap_or(DEFAULT_OUTPUT.to_string()),
        };

        Ok(config)
    }

    /// Loads the file at CONFIG_PATH or `config.toml` by default,
    /// parses required and optional data, like page titles, work projects, and more
    fn from_config_file() -> TomlConfig {
        let config_path = std::env::var("CONFIG_PATH").unwrap_or("config.toml".to_string());
        let config_file =
            fs::read_to_string(config_path).expect("[CONFIG ERROR] Could not read in config");
        toml::from_str::<TomlConfig>(&config_file)
            .expect("[CONFIG ERROR] Could not parse config from file")
    }
}
