use std::fs;
use std::fs::File;
use std::io::Write;

use crate::website::Website;

mod website;

static OUTPUT_DIR: &str = "_out";

fn main() -> Result<(), std::io::Error> {
    // Initialize by making sure all output directories are ready
    fs::create_dir_all(OUTPUT_DIR)?;
    let website = Website::default()?;
    let html: Vec<(String, String)> = website.generate_html();
    for (title, html) in html {
        let mut index_file = File::create(format!("{}/{}", OUTPUT_DIR, title))?;
        index_file.write_all(html.as_bytes())?;
    }

    Ok(())
}
