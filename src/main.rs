use std::fs;

use handlebars::Handlebars;

use crate::website::config::Config;
use crate::website::Website;

mod website;

fn main() -> Result<(), std::io::Error> {
    // Generate HTML
    let mut handlebars = Handlebars::new();
    handlebars
        .register_templates_directory(".hbs", "templates")
        .expect("[HANDLEBARS ERROR] Could not register templates directory");

    Website::generate(&handlebars, Config::default())?;

    Ok(())
}
