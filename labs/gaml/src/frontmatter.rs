// This module is responsible for reading and writing frontmatter from files
use super::file_history::FileHistory;
use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{self, BufRead, BufReader};

#[derive(Deserialize, Serialize, Debug)]
pub struct YamlFrontmatter {
    pub(crate) title: String,
    pub(crate) slug: String,
    pub(crate) summary: String,
    pub(crate) category: String,
    pub(crate) edits: Option<Vec<FileHistory>>,
}

// Parses raw frontmatter from a file into a struct
pub(crate) fn parse_from_file(path: &str) -> Result<YamlFrontmatter> {
    let frontmatter = extract_from_file(path).expect("Could not extract frontmatter from file");
    let parsed_frontmatter =
        serde_yaml::from_str(&frontmatter).expect("Could not parse frontmatter, expected YAML");

    Ok(parsed_frontmatter)
}

// Extracts the frontmatter string from a file, expected to be surrounded by "---"
fn extract_from_file(path: &str) -> io::Result<String> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    let mut frontmatter = String::new();
    let mut in_frontmatter = false;

    // Read each line of the file
    for line in reader.lines() {
        let line = line?;
        // If we see a line with only "---", we toggle the in_frontmatter flag
        // The first time we see this should be the start of the frontmatter
        // The second time should be the end
        if line.trim() == "---" {
            if in_frontmatter {
                break;
            } else {
                in_frontmatter = true;
                continue;
            }
        }
        if in_frontmatter {
            frontmatter.push_str(&line);
            frontmatter.push('\n');
        }
    }
    Ok(frontmatter)
}

// Writes the frontmatter back to the file
// This replaces the entire frontmatter with the new frontmatter
pub(crate) fn replace_frontmatter(path: &str, new_fm: YamlFrontmatter) -> Result<()> {
    // Read the file into a string
    let file = File::open(path)?;
    // Read each line, and capture all lines after the frontmatter
    let reader = BufReader::new(file);
    let mut content = String::new();
    let mut in_frontmatter = false; // Use this line to let us know we are in the frontmatter
    let mut is_after_frontmatter = false; // Use this line to let us know we are after the frontmatter
    for line in reader.lines() {
        let line = line?;
        // This triggers on the first "---" line
        if line.trim() == "---" && !in_frontmatter {
            in_frontmatter = true;
            continue;
        }
        if in_frontmatter && line.trim() == "---" {
            in_frontmatter = false;
            is_after_frontmatter = true;
            continue;
        }

        if is_after_frontmatter {
            content.push_str(&line);
            content.push('\n');
        }
    }
    // Now we replace the file with the new frontmatter and old content
    let mut new_file = String::new();
    new_file.push_str("---\n");
    new_file.push_str(&serde_yaml::to_string(&new_fm)?);
    new_file.push_str("---\n");
    new_file.push_str(&content);
    // And write the rest of the file
    // Write the new file back to the original file
    std::fs::write(path, new_file).expect("Could not write new frontmatter to file");

    Ok(())
}
