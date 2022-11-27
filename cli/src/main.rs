use env_logger::init;
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

fn main() -> Result<(), std::io::Error> {
    init();

    debug!("[HANDLEBARS] {}", "initializing registration");
    // Generate HTML
    let mut handlebars = Handlebars::new();
    handlebars.register_helper("month_name", Box::new(hb_month_name_helper));

    handlebars
        .register_templates_directory(".hbs", "templates")
        .expect("[HANDLEBARS ERROR] Could not register templates directory");

    handlebars
        .register_templates_directory(".hbs", "templates/pages")
        .expect("[HANDLEBARS ERROR] Could not register templates/pages directory");

    debug!("[WEBSITE] {}", "generating");

    Website::generate(&handlebars, Config::default())?;

    Ok(())
}
