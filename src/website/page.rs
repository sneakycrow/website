use handlebars::Handlebars;
use serde::Serialize;

#[derive(Serialize)]
pub(crate) enum Page {
    Index(PageData),
    Standard(PageData),
    BlogPage(PageData),
}

#[derive(Serialize)]
pub(crate) struct PageData {
    pub(crate) title: String,
    pub(crate) subtitle: String,
    pub(crate) name: String,
}

impl Page {
    pub(crate) fn generate_html(page: Page, registry: &Handlebars) -> (String, String) {
        match page {
            Page::Index(data) => (
                format!("{}.html", data.name),
                registry
                    .render(&data.name, &data)
                    .expect("[HANDLEBARS ERROR] Could not render page"),
            ),
            Page::Standard(data) => (
                format!("{}.html", data.name),
                registry
                    .render(&data.name, &data)
                    .expect("[HANDLEBARS ERROR] Could not render page"),
            ),
            Page::BlogPage(data) => (
                format!("{}.html", data.name),
                registry
                    .render(&data.name, &data)
                    .expect("[HANDLEBARS ERROR] Could not render page"),
            ),
        }
    }
}
