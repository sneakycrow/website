#[macro_use]
extern crate log;

use handlebars::{Handlebars, RenderError};
use std::collections::BTreeMap;
use std::fs::{File, create_dir_all};
use std::io::Write;

fn main() {
    env_logger::init();
    info!("starting up");

    let render_index_result = render_index();
    match render_index_result {
        Ok(rendered_template_string) => {
            let generated_page = save_html_page(rendered_template_string);
            match generated_page {
                Ok(_) => println!("{} {}", "index.html", "page generated!"),
                Err(e) => println!("{}: \n{}", "Error generating page:", e)
            }
        },
        Err(e) => println!("{}: \n{}", "error rendering template", e)
    }
}

/// render_index generates the index.html page for the website
fn render_index() -> Result<String, RenderError> {
    let mut handlebars = Handlebars::new();

    handlebars.set_strict_mode(true);
    handlebars.register_template_file("index", "./templates/index.hbs")?;
    let mut data = BTreeMap::new();
    data.insert("year".to_string(), "2021".to_string());
    data.insert("engine".to_string(), "render_index".to_string());

    handlebars.render("index", &data)
}

/// save_html_page is a function for generating an html page in a project root directory
fn save_html_page(content: String) -> std::io::Result<()> {
    create_dir_all("./dist")?;
    let path = "./dist/index.html";
    let mut output = File::create(path)?;
    output.write_all(&*content.into_bytes())
}