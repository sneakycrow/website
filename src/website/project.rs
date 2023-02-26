use std::io::ErrorKind;
use std::io::ErrorKind::InvalidData;

use chrono::{DateTime, Utc};
use reqwest::{header, Client, ClientBuilder};
use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};
use tracing::{debug, error, event, span, Level};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub(crate) struct Project {
    pub(crate) repository: String,
    pub(crate) short_name: Option<String>,
    pub(crate) description: Option<String>,
    pub(crate) languages: Option<Vec<ProjectLanguage>>,
    pub(crate) updated_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub(crate) struct ProjectLanguage {
    name: String,
    bytes: i32,
}

impl Project {
    /// Downloads the project from GitHub
    pub(crate) async fn download(repository: String, client: &Client) -> Self {
        let mut project = Project {
            repository,
            short_name: None,
            description: None,
            languages: None,
            updated_at: None,
        };

        project.download_repository(client).await;

        return project;
    }

    /// Downloads the repository from GitHub and replaces the data with GitHub's API Response
    pub(crate) async fn download_repository(&mut self, client: &Client) {
        let repository_name = String::from(&self.repository);
        span!(
            Level::TRACE,
            "[PROJECT] Downloading {:?} from GitHub",
            repository_name
        );

        let repository = match self.fetch_repository(client).await {
            Ok(repo) => {
                event!(
                    Level::TRACE,
                    "Successfully retrieved repository {:?}",
                    repository_name
                );

                repo
            }
            Err(e) => {
                event!(
                    Level::ERROR,
                    "Could not download repository {:?}, Error: {:?}",
                    repository_name,
                    e
                );
                return;
            }
        };

        let languages = repository
            .languages
            .iter()
            .map(|(key, value)| {
                Some(ProjectLanguage {
                    name: key.to_owned(),
                    bytes: value.to_string().parse::<i32>().unwrap(),
                })
            })
            .collect();

        self.languages = languages;
        self.description = Some(repository.description);
        self.short_name = Some(repository.name);
        self.updated_at = Some(repository.updated_at.to_string());
    }

    pub(crate) fn get_github_client() -> Result<Client, std::io::Error> {
        span!(Level::TRACE, "Getting GitHub Client");
        let mut headers = header::HeaderMap::new();
        let token = Self::get_github_token()?;
        let formatted_token = format!("Bearer {}", token);
        let header = header::HeaderValue::from_str(&formatted_token)
            .map_err(|err| std::io::Error::new(ErrorKind::Other, err))?;
        headers.insert("Authorization", header);

        ClientBuilder::new()
            .default_headers(headers)
            .user_agent("sneakycrow-website-generator")
            .build()
            .map_err(|err| std::io::Error::new(InvalidData, err))
    }

    fn get_github_token() -> Result<String, std::io::Error> {
        span!(Level::TRACE, "Getting GitHub token");
        std::env::var("GH_TOKEN").map_err(|_err| {
            std::io::Error::new(
                ErrorKind::NotFound,
                "[ENVIRONMENT ERROR] GH_TOKEN not available",
            )
        })
    }

    async fn fetch_repository(&mut self, client: &Client) -> Result<Repository, std::io::Error> {
        span!(Level::TRACE, "Fetching repository {}", self.repository);
        let repo = &self.repository;

        let url = format!("https://api.github.com/repos/{}", repo);
        let repository = client
            .get(url)
            .send()
            .await
            .map_err(|err| std::io::Error::new(ErrorKind::Other, err))?
            .json::<GithubRepositoryResponse>()
            .await
            .map_err(|err| std::io::Error::new(ErrorKind::Other, err))?;

        let languages = client
            .get(repository.languages_url)
            .send()
            .await
            .map_err(|err| std::io::Error::new(ErrorKind::Other, err))?
            .json::<Map<String, Value>>()
            .await
            .map_err(|err| std::io::Error::new(ErrorKind::Other, err))?;

        let parsed_updated_at = DateTime::from(
            DateTime::parse_from_rfc3339(&repository.updated_at)
                .map_err(|err| std::io::Error::new(InvalidData, err))?,
        );

        Ok(Repository {
            name: repository.name,
            description: repository.description,
            _topics: repository.topics,
            updated_at: parsed_updated_at,
            languages,
            private: repository.private,
        })
    }
}

struct Repository {
    name: String,
    description: String,
    _topics: Vec<String>,
    languages: Map<String, Value>,
    updated_at: DateTime<Utc>,
    private: bool,
}

#[derive(Deserialize, Debug)]
struct GithubRepositoryResponse {
    languages_url: String,
    topics: Vec<String>,
    description: String,
    name: String,
    updated_at: String,
    private: bool,
}
