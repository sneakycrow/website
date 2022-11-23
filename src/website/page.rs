use handlebars::Handlebars;
use serde::Serialize;

use crate::website::post::Post;

#[derive(Serialize)]
pub(crate) enum Page {
    Home(PageData),
    Standard(PageData),
    BlogIndex(BlogIndexData),
    BlogPost(Post),
}

#[derive(Serialize)]
pub(crate) struct PageData {
    pub(crate) title: String,
    pub(crate) subtitle: String,
    pub(crate) name: String,
}

#[derive(Serialize)]
pub(crate) struct PostMetaData {
    pub(crate) url: String,
    pub(crate) title: String,
}

#[derive(Serialize)]
pub(crate) struct BlogIndexData {
    pub(crate) title: String,
    pub(crate) subtitle: String,
    pub(crate) name: String,
    pub(crate) posts: Vec<PostMetaData>,
}

impl Page {
    pub(crate) fn generate_html(&self, registry: &Handlebars) -> (String, String) {
        match self {
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
                format!("{}.html", data.url),
                registry
                    .render("post", &data)
                    .expect("[HANDLEBARS ERROR] Could not render blog post page"),
            ),
        }
    }
}
