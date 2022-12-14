use std::path::Path;

use chrono::{DateTime, TimeZone, Utc};
use git2::{Commit, Oid, Repository};
use serde::Serialize;

#[derive(Serialize, Clone)]
pub(crate) struct FileChange {
    oid: String,
    message: String,
    pub(crate) date: DateTime<Utc>,
}

impl FileChange {
    pub(crate) fn from_path(path: &Path) -> Result<Vec<FileChange>, std::io::Error> {
        let repo = match Repository::discover(".") {
            Ok(repo) => repo,
            Err(e) => panic!("failed to open: {}", e),
        };

        let commits: Vec<Oid> = repo
            .blame_file(path, None)
            .expect("[GIT ERROR] Could not find blame")
            .iter()
            .map(|hunk| hunk.final_commit_id())
            .collect::<Vec<Oid>>();

        Ok(commits
            .into_iter()
            .map(|oid| {
                let commit = repo
                    .find_commit(oid)
                    .expect("[HISTORY ERROR] Could not parse commit history");

                FileChange {
                    oid: oid.to_string(),
                    date: Utc.timestamp_opt(commit.time().seconds(), 0).unwrap(),
                    message: commit.message().unwrap().to_string(),
                }
            })
            .collect())
    }
}
