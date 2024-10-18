mod series;

use chrono::Local;
use clap::{Parser, Subcommand};
use dialoguer::{Input, Select};
use series::get_existing_series;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    New {
        #[arg(short, long)]
        title: String,
        #[arg(short, long)]
        category: Option<String>,
        #[arg(short, long)]
        summary: Option<String>,
        #[arg(short, long, action)]
        draft: bool,
        #[arg(short, long, action)]
        series: bool,
    },
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::New {
            title,
            category,
            summary,
            draft,
            series,
        } => {
            create_new_post(title, category, summary, draft, series);
        }
    }
}

fn create_new_post(
    title: &str,
    category: &Option<String>,
    summary: &Option<String>,
    draft: &bool,
    series: &bool,
) {
    // Construct the date out of todays date
    let date = Local::now().format("%Y-%m-%d").to_string();
    // Create a dash separated slug out of the title
    let slug = title.to_lowercase().replace(" ", "-");
    // Check if we're posting a draft
    let folder = if *draft { "_drafts" } else { "_posts" };
    // Make sure the destination folder is available
    std::fs::create_dir_all(folder).expect("Unable to create folder");
    // Construct the markdown file with the folder, date, and slug
    let filename = format!("{}/{}-{}.md", folder, date, slug);
    // Initialize the frontmatter YAML
    let mut content = String::new();
    // It must start and end with `---` to be valid
    content.push_str("---\n");
    // Push all provided properties to the YAML
    content.push_str(&format!("title: \"{}\"\n", title));
    if let Some(cat) = category {
        content.push_str(&format!("category: \"{}\"\n", cat));
    }
    if let Some(sum) = summary {
        content.push_str(&format!("summary: \"{}\"\n", sum));
    }
    // If the series flag is set, parse the available series from the existing posts
    if *series {
        // Get all of our existing series in _posts/
        let existing_series = get_existing_series();
        // Convert them to options in addition to a "new" option
        let mut series_options: Vec<String> = existing_series.into_iter().collect();
        series_options.push("New series".to_string());
        // Ask the user which series they want
        let selection = Select::new()
            .with_prompt("Select a series or create a new one")
            .items(&series_options)
            .default(0)
            .interact()
            .unwrap();
        // If they selected a "new" option, ask for a new key, otherwise use the existing key
        let series_key = if selection == series_options.len() - 1 {
            Input::new()
                .with_prompt("Enter new series key")
                .interact_text()
                .unwrap()
        } else {
            series_options[selection].clone()
        };
        // Push the key and the position of the article up
        content.push_str(&format!("series_key: \"{}\"\n", series_key));
        // TODO: Have the default be the next position in the series
        let series_pos: i32 = Input::new()
            .with_prompt("Enter series position")
            .interact_text()
            .unwrap();
        content.push_str(&format!("series_pos: {}\n", series_pos));
    }
    // Close out the frontmatter YAML
    content.push_str("---\n\n");
    let path = PathBuf::from(&filename);
    let mut file = File::create(path).expect("Unable to create file");
    file.write_all(content.as_bytes())
        .expect("Unable to write data");

    println!("Created new post: {}", filename);
}
