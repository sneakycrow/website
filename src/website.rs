use handlebars::Handlebars;
use serde::Serialize;

pub(crate) struct Website<'reg> {
    pub(crate) handlebars_registry: Handlebars<'reg>,
    pub(crate) pages: Vec<Page>,
}

#[derive(Serialize)]
pub(crate) enum Page {
    Index(IndexData),
}

#[derive(Serialize)]
pub(crate) struct IndexData {
    title: String,
}

impl Page {
    pub(crate) fn generate_html(page: Page, registry: &Handlebars) -> (String, String) {
        match page {
            Page::Index(data) => (
                "index.html".to_string(),
                registry
                    .render("index", &data)
                    .expect("[HANDLEBARS ERROR] Could not render index page"),
            ),
        }
    }
}

impl<'reg> Website<'reg> {
    // Creates a website with a single index page
    pub(crate) fn default() -> Result<Self, std::io::Error> {
        let registry = Website::register_templates()?;

        let index_page = Page::Index(IndexData {
            title: "Zachary Sohovich | sneaky crow".to_string(),
        });

        Ok(Website {
            handlebars_registry: registry,
            pages: vec![index_page],
        })
    }

    // Initializes handlebars with parsed templates
    pub(crate) fn register_templates() -> Result<Handlebars<'reg>, std::io::Error> {
        let mut handlebars = Handlebars::new();
        handlebars
            .register_templates_directory(".hbs", "templates")
            .expect("[HANDLEBARS ERROR] Could not register templates directory");

        Ok(handlebars)
    }

    // Generates all html for pages within website
    pub(crate) fn generate_html(self) -> Vec<(String, String)> {
        let mut parsed_pages: Vec<(String, String)> = vec![];
        for page in self.pages {
            let parsed_page = Page::generate_html(page, &self.handlebars_registry);
            parsed_pages.push(parsed_page);
        }

        return parsed_pages;
    }
}
