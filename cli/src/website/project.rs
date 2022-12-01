use std::io::ErrorKind;

use chrono::{DateTime, Utc};
use log::debug;
use reqwest::{header, Client, ClientBuilder};
use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct Project {
    name: String,
    description: String,
    languages: Map<String, Value>,
}

impl Project {
    pub(crate) async fn from_github(repository: &str) -> Self {
        let repository = Self::get_repository(repository)
            .await
            .expect("[GITHUB ERROR] Could not get repository");
        Project {
            name: repository.name,
            description: repository.description,
            languages: repository.languages,
        }
    }

    fn get_github_client() -> Result<Client, std::io::Error> {
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
            .map_err(|err| std::io::Error::new(ErrorKind::InvalidData, err))
    }

    fn get_github_token() -> Result<String, std::io::Error> {
        std::env::var("GITHUB_TOKEN").map_err(|err| {
            std::io::Error::new(
                ErrorKind::NotFound,
                "[ENVIRONMENT ERROR] GITHUB_TOKEN not available",
            )
        })
    }

    async fn get_repository(repo: &str) -> Result<Repository, std::io::Error> {
        debug!("[GETTING REPOSITORY] Getting {} data from GitHub", repo);
        let url = format!("https://api.github.com/repos/{}", repo);
        let client = Self::get_github_client()?;
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
                .map_err(|err| std::io::Error::new(ErrorKind::InvalidData, err))?,
        );

        Ok(Repository {
            name: repository.name,
            description: repository.description,
            topics: repository.topics,
            updated_at: parsed_updated_at,
            languages,
            private: repository.private,
        })
    }
}

struct Repository {
    name: String,
    description: String,
    topics: Vec<String>,
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
