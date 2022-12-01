use std::fs;

use serde::Deserialize;

use crate::website::project::Project;

#[derive(Deserialize)]
pub(crate) struct Config {
    pub(crate) output_directory: String,
    pub(crate) title: String,
    pub(crate) subtitle: String,
    pub(crate) projects: Vec<Project>,
}

#[derive(Deserialize)]
pub(crate) struct TOMLConfig {
    output_directory: String,
    title: String,
    subtitle: String,
    github_projects: Option<Vec<String>>,
}

impl Config {
    pub(crate) async fn default() -> Self {
        // Read in configuration file for various settings
        let config_file =
            fs::read_to_string("config.toml").expect("[CONFIG ERROR] Could not read in config");
        let toml_config: TOMLConfig =
            toml::from_str(&config_file).expect("[CONFIG ERROR] Could not parse config from file");

        let mut projects: Vec<Project> = vec![];
        if let Some(repositories) = toml_config.github_projects {
            for repo in repositories {
                let project = Project::from_github(&repo).await;
                projects.push(project)
            }
        }

        Config {
            output_directory: toml_config.output_directory,
            title: toml_config.title,
            subtitle: toml_config.subtitle,
            projects,
        }
    }
}
