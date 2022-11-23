use handlebars::Handlebars;
use serde::Serialize;

#[derive(Serialize)]
pub(crate) enum Page {
    Home(PageData),
    Standard(PageData),
    BlogIndex(PageData),
    BlogPost(PageData),
}

#[derive(Serialize)]
pub(crate) struct PageData {
    pub(crate) title: String,
    pub(crate) subtitle: String,
    pub(crate) name: String,
}

impl Page {
    pub(crate) fn generate_html(page: &Page, registry: &Handlebars) -> (String, String) {
        match page {
            Page::Home(data) => (
                format!("{}.html", data.name),
                registry
                    .render(&data.name, &data)
                    .expect("[HANDLEBARS ERROR] Could not render home page"),
            ),
            Page::Standard(data) => (
                format!("{}.html", data.name),
                registry
                    .render(&data.name, &data)
                    .expect("[HANDLEBARS ERROR] Could not render standard page"),
            ),
            Page::BlogIndex(data) => (
                format!("{}.html", data.name),
                registry
                    .render(&data.name, &data)
                    .expect("[HANDLEBARS ERROR] Could not render blog index page"),
            ),
            Page::BlogPost(data) => (
                format!("{}.html", data.name),
                registry
                    .render(&data.name, &data)
                    .expect("[HANDLEBARS ERROR] Could not render blog post page"),
            ),
        }
    }
}
