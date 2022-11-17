use handlebars::Handlebars;
use serde::Serialize;

#[derive(Serialize)]
pub(crate) enum Page {
    Index(IndexData),
}

#[derive(Serialize)]
pub(crate) struct IndexData {
    pub(crate) title: String,
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
