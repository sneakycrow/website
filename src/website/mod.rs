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
    // Creates a website with a single index page
    pub(crate) fn default() -> Result<Self, std::io::Error> {
        let index_page = Page::Index(IndexData {
            title: "Zachary Sohovich | sneaky crow".to_string(),
        });

        Ok(Website {
            pages: vec![index_page],
        })
    }

    // Generates all assets for deployment
    pub(crate) fn generate(
        self,
        registry: &Handlebars,
        output_path: &str,
    ) -> Result<(), std::io::Error> {
        let mut parsed_pages: Vec<(String, String)> = vec![];
        for page in self.pages {
            let parsed_page = Page::generate_html(page, registry);
            parsed_pages.push(parsed_page);
        }

        let css_text = Self::compile_sass("templates/assets/css/_index.scss");
        println!("CSS COMPILED {:?}", css_text);
        let mut css_file = File::create(format!("{}/{}", output_path, "main.css"))?;
        css_file.write_all(css_text.as_bytes())?;

        for (title, html) in parsed_pages {
            let mut index_file = File::create(format!("{}/{}", output_path, title))?;
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
