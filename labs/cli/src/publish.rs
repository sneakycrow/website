use chrono::Local;
use dialoguer::Select;
use std::fs;
use std::path::{Path, PathBuf};

pub fn publish_draft(draft_file: Option<String>) {
    let drafts_dir = Path::new("_drafts");
    let posts_dir = Path::new("_posts");

    if !drafts_dir.exists() {
        println!("No _drafts directory found.");
        return;
    }

    let draft_to_publish = match draft_file {
        Some(file) => Some(PathBuf::from(drafts_dir).join(file)),
        None => select_draft(drafts_dir),
    };

    if let Some(draft_path) = draft_to_publish {
        if !draft_path.exists() {
            println!("The specified draft file does not exist.");
            return;
        }

        let new_date = Local::now().format("%Y-%m-%d").to_string();
        let file_name = draft_path.file_name().unwrap().to_str().unwrap();
        let new_file_name = format!(
            "{}-{}",
            new_date,
            file_name
                .split('-')
                .skip(3)
                .collect::<Vec<&str>>()
                .join("-")
        );
        let new_path = posts_dir.join(&new_file_name);

        // Update the date in the file content
        let mut content = fs::read_to_string(&draft_path).expect("Unable to read draft file");
        content = content.replace("date:", &format!("date: {}", new_date));

        // Write the updated content to the new file
        fs::write(&new_path, content).expect("Unable to write to new file");

        // Remove the old draft file
        fs::remove_file(&draft_path).expect("Unable to remove old draft file");

        println!(
            "Published: {} -> {}",
            draft_path.display(),
            new_path.display()
        );
    } else {
        println!("No draft selected for publishing.");
    }
}

fn select_draft(drafts_dir: &Path) -> Option<PathBuf> {
    let drafts: Vec<_> = fs::read_dir(drafts_dir)
        .expect("Unable to read drafts directory")
        .filter_map(|entry| {
            let entry = entry.ok()?;
            let path = entry.path();
            if path.is_file() && path.extension()? == "md" {
                Some(path)
            } else {
                None
            }
        })
        .collect();

    if drafts.is_empty() {
        println!("No drafts found in the _drafts directory.");
        return None;
    }

    let draft_names: Vec<_> = drafts
        .iter()
        .map(|path| path.file_name().unwrap().to_str().unwrap())
        .collect();

    let selection = Select::new()
        .with_prompt("Select a draft to publish")
        .items(&draft_names)
        .interact()
        .ok()?;

    Some(drafts[selection].clone())
}
