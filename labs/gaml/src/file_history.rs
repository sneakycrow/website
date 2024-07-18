// This module is responsible for reading and parsing git history from a file
use anyhow::Result;
use serde::{Deserialize, Serialize};

// Parses raw git history from a file into a struct
pub(crate) fn get_history(file_path: &str) -> Result<Vec<FileHistory>> {
    // First open the repository, presuming the current working directory is the repository
    let repo_path = std::env::current_dir()?;
    let repo = git2::Repository::open(repo_path)?;
    // Parse the file_path into a Path
    let target_file_path = std::path::Path::new(file_path);
    let blame = repo.blame_file(target_file_path, None)?;
    let mut history: Vec<FileHistory> = vec![];
    // Iterate over the blame and print the commit hash and line
    for line in blame.iter() {
        let commit = line.orig_commit_id();
        let commit = repo.find_commit(commit)?;
        let message = commit.summary().unwrap_or("No message");
        // If the message starts with [galm], skip it its a galm commit
        if message.starts_with("[galm]") {
            continue;
        }
        let author = commit.author();
        let author_name = author.name().unwrap_or("Unknown");
        let timestamp = commit.time().seconds();
        let history_item = FileHistory {
            id: commit.id().to_string(),
            message: message.to_string(),
            author: author_name.to_string(),
            timestamp: timestamp.to_string(),
        };
        // If an item is not in the history, add it
        // Check against the history item id
        if !history.iter().any(|h| h.id == history_item.id) {
            history.push(history_item);
        }
    }
    Ok(history)
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub(crate) struct FileHistory {
    pub(crate) id: String,
    pub(crate) message: String,
    pub(crate) author: String,
    pub(crate) timestamp: String,
}
