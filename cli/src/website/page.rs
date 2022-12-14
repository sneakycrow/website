use handlebars::Handlebars;
use serde::Serialize;

use crate::website::post::{Category, Post};
use crate::website::project::Project;

#[derive(Serialize)]
pub(crate) enum Page {
    Home(PageData),
    Standard(PageData),
    BlogIndex(BlogData),
    BlogPost(Post),
}

#[derive(Serialize)]
pub(crate) struct PageData {
    pub(crate) title: String,
    pub(crate) subtitle: String,
    pub(crate) name: String,
    pub(crate) posts: Option<Vec<PostMetaData>>,
    pub(crate) projects: Option<Vec<Project>>,
    pub(crate) projects_json: Option<String>,
}

#[derive(Serialize)]
pub(crate) struct BlogData {
    pub(crate) title: String,
    pub(crate) subtitle: String,
    pub(crate) name: String,
    pub(crate) posts: Option<Vec<Category>>,
}

#[derive(Serialize, Clone)]
pub(crate) struct PostMetaData {
    pub(crate) url: String,
    pub(crate) title: String,
    pub(crate) month: u32,
    pub(crate) year: i32,
    pub(crate) day: u32,
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
