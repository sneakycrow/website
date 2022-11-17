use std::fs;

use handlebars::Handlebars;

use crate::website::Website;

mod website;

static OUTPUT_DIR: &str = "_out";

fn main() -> Result<(), std::io::Error> {
    // Generate HTML
    let mut handlebars = Handlebars::new();
    handlebars
        .register_templates_directory(".hbs", "templates")
        .expect("[HANDLEBARS ERROR] Could not register templates directory");

    // Initialize by making sure all output directories are ready
    fs::create_dir_all(OUTPUT_DIR)?;
    Website::generate(&handlebars, OUTPUT_DIR)?;

    Ok(())
}
