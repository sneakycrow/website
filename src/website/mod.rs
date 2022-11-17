use std::ffi::OsStr;
use std::fs::File;
use std::io::Write;

use handlebars::Handlebars;
use walkdir::WalkDir;

use crate::website::page::{IndexData, Page};

mod css;
mod page;

pub(crate) struct Website {
    pub(crate) pages: Vec<Page>,
}

impl Website {
    // Generates all assets for deployment
    pub(crate) fn generate(registry: &Handlebars, output_path: &str) -> Result<(), std::io::Error> {
        // Compile Stylesheets
        let css_text = Self::compile_sass("templates/assets/css/_index.scss");
        let css_path = format!("{}/{}", output_path, "main.css");
        println!("CSS COMPILED {:?}", css_text);
        let mut css_file = File::create(&css_path)?;
        css_file.write_all(css_text.as_bytes())?;

        // Compile HTML from Pages
        let index_page = Page::Index(IndexData {
            title: "Zachary Sohovich | sneaky crow".to_string(),
        });

        let pages: Vec<Page> = vec![index_page];
        let mut parsed_pages: Vec<(String, String)> = vec![];
        for page in pages {
            let parsed_page = Page::generate_html(page, registry);
            parsed_pages.push(parsed_page);
        }

        // Compile HTML
        for (file_name, html) in parsed_pages {
            let mut index_file = File::create(format!("{}/{}", output_path, file_name))?;
            index_file.write_all(html.as_bytes())?;
        }
        Ok(())
    }

    // Compile SASS for all scss files within the path
    fn compile_sass(path: &str) -> String {
        grass::from_path(path, &grass::Options::default()).expect(
            format!(
                "[SASS COMPILATION ERROR] Could not compile sass file {}",
                path
            )
            .as_str(),
        )
    }
}
