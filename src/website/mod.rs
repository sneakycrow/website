use std::fs;
use std::fs::File;
use std::io::Write;

use handlebars::Handlebars;
use walkdir::WalkDir;

use crate::website::config::Config;
use crate::website::page::{Page, PageData};

pub(crate) mod config;
mod css;
mod page;

pub(crate) struct Website {
    pub(crate) config: Config,
}

impl Website {
    // Generates all assets for deployment
    pub(crate) fn generate(registry: &Handlebars, config: Config) -> Result<(), std::io::Error> {
        // Initialize by making sure all output directories are ready
        fs::create_dir_all(&config.output_directory)?;
        // Compile Stylesheets
        let css_text = Self::compile_sass("templates/assets/css/_index.scss");
        let css_path = format!("{}/{}", config.output_directory, "main.css");
        let mut css_file = File::create(&css_path)?;
        css_file.write_all(css_text.as_bytes())?;

        Self::generate_pages(&config)?.iter().for_each(|p| {
            let (file_name, html) = Page::generate_html(p, registry);
            let path = format!("{}/{}", config.output_directory, file_name);
            let mut html_file = File::create(&path)
                .expect(format!("[PAGE CREATION ERROR] Could not create {}", &path).as_str());
            html_file
                .write_all(html.as_bytes())
                .expect(format!("[PAGE WRITE ERROR] Could not write {}", &path).as_str())
        });

        // Copy static assets
        // Create asset directory
        let asset_path = format!("{}/{}", config.output_directory, "assets");
        fs::create_dir_all(&asset_path)?;
        // Copy fonts
        let fonts_path = format!("{}/{}", &asset_path, "fonts");
        fs::create_dir_all(&fonts_path)?;
        Self::copy_assets("templates/assets/fonts", &fonts_path)?;
        // Copy images
        let images_path = format!("{}/{}", &asset_path, "images");
        fs::create_dir_all(&images_path)?;
        Self::copy_assets("templates/assets/images", &images_path)?;
        // Copy js
        let js_path = format!("{}/{}", &asset_path, "js");
        fs::create_dir_all(&js_path)?;
        Self::copy_assets("templates/assets/js", &js_path)?;
        Ok(())
    }

    // Compile SASS for all scss files within the path and return the compiled CSS
    fn compile_sass(path: &str) -> String {
        grass::from_path(path, &grass::Options::default()).expect(
            format!(
                "[SASS COMPILATION ERROR] Could not compile sass file {}",
                path
            )
            .as_str(),
        )
    }

    // Copies static assets (such as images, and fonts) to the output path
    fn copy_assets(input_path: &str, output_path: &str) -> Result<(), std::io::Error> {
        for entry in WalkDir::new(input_path) {
            let unwrapped_entry = entry.unwrap();
            if unwrapped_entry.path().is_file() {
                let file_name = unwrapped_entry.path().file_name().unwrap().to_str();
                if let Some(name) = file_name {
                    let full_output_path = format!("{}/{}", output_path, name);
                    let input_file = fs::read(unwrapped_entry.path())?;
                    let mut output_file = File::create(full_output_path)?;
                    output_file.write_all(&input_file)?;
                }
            }
        }
        Ok(())
    }

    /// Generates pages based on files in the templates directory, excluding the index page
    fn generate_pages(config: &Config) -> Result<Vec<Page>, std::io::Error> {
        let mut pages: Vec<Page> = vec![];
        for entry in WalkDir::new("templates/pages") {
            let file = entry?;
            if file.path().is_file() {
                if let Some(name_without_extension) = file.path().file_stem() {
                    let name = name_without_extension.to_str().unwrap();

                    let page: Page = match name {
                        "index" => Page::Home(PageData {
                            name: "index".to_string(),
                            title: config.title.to_string(),
                            subtitle: config.subtitle.to_string(),
                        }),
                        "blog" => Page::BlogIndex(PageData {
                            name: "blog".to_string(),
                            title: "sneaky crow blog".to_string(),
                            subtitle: "a bunch of ramblings".to_string(),
                        }),
                        _ => {
                            let page = Page::Standard(PageData {
                                name: name.to_string(),
                                title: "unknown".to_string(),
                                subtitle: format!("unknown page type - {}", &name),
                            });

                            page
                        }
                    };

                    pages.push(page)
                }
            }
        }
        Ok(pages)
    }
}
