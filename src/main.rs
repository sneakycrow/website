#[macro_use]
extern crate log;

use handlebars::{Handlebars, RenderError};
use std::collections::BTreeMap;
use std::fs::{File, create_dir_all};
use std::io::Write;
use walkdir::WalkDir;
use log::{log, Level};

const DIST_TARGET_DIR: &str = "./dist";

fn main() {
    env_logger::init();
    info!("starting up");

    // Generate index page
    let render_index_result = render_index();
    match render_index_result {
        Ok(rendered_template_string) => {
            let generated_page = save_html_page(rendered_template_string);
            match generated_page {
                Ok(_) => log!(Level::Info, "{} {}", "index.html", "page generated!"),
                Err(e) => log!(Level::Error, "{}: \n{}", "Error generating page:", e)
            }
        },
        Err(e) => log!(Level::Error, "{}: \n{}", "error rendering template", e)
    };

    distribute_assets("./assets");
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
    create_dir_all(DIST_TARGET_DIR)?;
    let path = format!("{}/{}", DIST_TARGET_DIR, "/index.html");
    let mut output = File::create(path)?;
    output.write_all(&*content.into_bytes())
}

/// distribute_assets copies and processes all assets into the distribution folder
fn distribute_assets(target_dir: &str) {
    for entry in WalkDir::new(target_dir).into_iter().filter_map(|e| e.ok()) {
        let entry_display = entry.path().display();
        let entry_dest = format!("./dist/{}", &entry_display);
        if entry.path().is_dir() {
            std::fs::create_dir_all(entry_dest).expect(&*format!("Could not create directory {}", entry_display));
        } else if entry.path().is_file() {
            let file_type = entry.path().extension();
            match file_type.unwrap().to_str() {
                Some("scss") => {
                    distribute_css(compile_scss(entry_display.to_string()));
                },
                _ => {
                    std::fs::copy(entry_display.to_string(), entry_dest).expect(&*format!("Could not copy file {}", entry_display));
                }
            }
        } else {
            log!(Level::Error, "I don't know what {} is", entry_display)
        }
    };
}

/// compile_sass targets all sass files in the sass directory for compilation
fn compile_scss(target: String) -> String {
    let css = sass_rs::compile_file(target, sass_rs::Options{
        output_style: sass_rs::OutputStyle::Nested,
        precision: 0,
        indented_syntax: false,
        include_paths: vec![]
    }).expect("Could not compile scss");

    return css;
}

/// distribute_css distributes the given css_content to the distribution directory
fn distribute_css(css_content: String) {
    let file_path = format!("{}/{}", DIST_TARGET_DIR, "styles.css");
    let mut file = std::fs::File::create(file_path).expect("Could not create css to file");
    file.write_all(css_content.as_ref()).expect("Could not write css to file");
}