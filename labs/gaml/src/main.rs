mod file_history;
mod frontmatter;

use file_history::FileHistory;

fn main() {
    let args: Vec<String> = std::env::args().collect();
    if args.len() > 1 {
        let path = &args[1];
        // First, we want to get the history of the file
        let f_history = file_history::get_history(path).expect("Could not get file history");
        // Next, grab the frontmatter from the file so we can compare
        let f_frontmatter =
            frontmatter::parse_from_file(path).expect("Could not parse frontmatter");
        // Create a vector of edits to append to the frontmatter
        let mut to_append: Vec<FileHistory> = vec![];
        // If there are no existing edits in the frontmatter, we can just append all the history
        let has_existing_edits = f_frontmatter.edits.is_some();
        if !has_existing_edits {
            to_append = f_history.clone();
        }
        // If there are edits, compare the history id's, and append any missing ones
        if has_existing_edits {
            for history in f_history {
                let edits = f_frontmatter.edits.as_ref().unwrap();
                if !edits.iter().any(|e| e.id == history.id) {
                    to_append.push(history);
                }
            }
        }
        // If there are no new edits, print a message and return
        if to_append.is_empty() {
            println!("No new edits to append to file {}", path);
            return;
        }
        // Append new edits if they exist
        if !to_append.is_empty() {
            let mut new_edits = f_frontmatter.edits.unwrap_or(vec![]);
            for history in to_append {
                new_edits.push(history);
            }
            // Update the frontmatter with the new edits
            let new_frontmatter = frontmatter::YamlFrontmatter {
                edits: Some(new_edits),
                ..f_frontmatter
            };
            // Replace the frontmatter in the file
            frontmatter::replace_frontmatter(path, new_frontmatter)
                .expect("Could not replace frontmatter");
        }
    } else {
        println!("No arguments provided.");
    }
}
