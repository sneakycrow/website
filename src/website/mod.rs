use handlebars::Handlebars;

use crate::website::page::{IndexData, Page};

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

    // Generates all html for pages within website
    pub(crate) fn generate_html(self, registry: &Handlebars) -> Vec<(String, String)> {
        let mut parsed_pages: Vec<(String, String)> = vec![];
        for page in self.pages {
            let parsed_page = Page::generate_html(page, registry);
            parsed_pages.push(parsed_page);
        }

        return parsed_pages;
    }
}
