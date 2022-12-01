use std::io::Error;

use handlebars::{handlebars_helper, Handlebars};
use log::debug;

use crate::website::config::Config;
use crate::website::Website;

mod website;

handlebars_helper!(hb_month_name_helper: |month_num: u64| match month_num {
    1 => "Jan.",
    2 => "Feb.",
    3 => "Mar.",
    4 => "Apr.",
    5 => "May",
    6 => "June",
    7 => "July",
    8 => "Aug.",
    9 => "Sept.",
    10 => "Oct.",
    11 => "Nov.",
    12 => "Dec.",
    _ => "Error!",
});

#[tokio::main]
async fn main() -> Result<Website, Error> {
    env_logger::init();

    debug!("[HANDLEBARS] {}", "initializing registration");
    // Generate Handlebars Registry
    let mut handlebars = Handlebars::new();
    // Include helper for parsing readable month
    handlebars.register_helper("month_name", Box::new(hb_month_name_helper));
    // Add templates in top-level templates directory, mostly just for the top index page
    handlebars
        .register_templates_directory(".hbs", "templates")
        .expect("[HANDLEBARS ERROR] Could not register templates directory");
    // Add templates in pages directory for page-level index pages
    handlebars
        .register_templates_directory(".hbs", "templates/pages")
        .expect("[HANDLEBARS ERROR] Could not register templates/pages directory");
    debug!("[WEBSITE] {}", "generating");

    // Finally, generate our website which should output our files into the respective output directory
    Website::generate(&handlebars, Config::default().await)
}
