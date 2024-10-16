use chrono::Local;
use clap::{Parser, Subcommand};
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
        series_key: Option<String>,
        #[arg(short, long)]
        series_pos: Option<i32>,
        #[arg(short, long)]
        summary: Option<String>,
    },
}

fn main() {
    let cli = Cli::parse();

    match &cli.command {
        Commands::New {
            title,
            category,
            series_key,
            series_pos,
            summary,
        } => {
            create_new_post(title, category, series_key, series_pos, summary);
        }
    }
}

fn create_new_post(
    title: &str,
    category: &Option<String>,
    series_key: &Option<String>,
    series_pos: &Option<i32>,
    summary: &Option<String>,
) {
    let date = Local::now().format("%Y-%m-%d").to_string();
    let slug = title.to_lowercase().replace(" ", "-");
    let filename = format!("website/_posts/{}-{}.md", date, slug);

    let mut content = String::new();
    content.push_str("---\n");
    content.push_str(&format!("title: \"{}\"\n", title));
    if let Some(cat) = category {
        content.push_str(&format!("category: \"{}\"\n", cat));
    }
    if let Some(key) = series_key {
        content.push_str(&format!("series_key: \"{}\"\n", key));
    }
    if let Some(pos) = series_pos {
        content.push_str(&format!("series_pos: {}\n", pos));
    }
    if let Some(sum) = summary {
        content.push_str(&format!("summary: \"{}\"\n", sum));
    }
    content.push_str("---\n\n");

    let path = PathBuf::from(&filename);
    let mut file = File::create(path).expect("Unable to create file");
    file.write_all(content.as_bytes())
        .expect("Unable to write data");

    println!("Created new post: {}", filename);
}
