use std::cmp::Ordering;
use std::fs;
use std::fs::File;
use std::io::Write;
use std::process::{ExitCode, Termination};

use handlebars::Handlebars;
use log::debug;
use serde_json::json;
use walkdir::WalkDir;

use crate::website::config::Config;
use crate::website::page::{BlogData, Page, PageData, PostMetaData};
use crate::website::post::{Category, Post};
use crate::website::series::Series;

pub(crate) mod config;
mod page;
mod post;
mod project;
mod series;

pub(crate) struct Website {
    pub(crate) config: Config,
}

impl Termination for Website {
    fn report(self) -> ExitCode {
        ExitCode::SUCCESS
    }
}

impl Website {
    // Generates all assets for deployment
    pub(crate) fn generate(registry: &Handlebars, config: Config) -> Result<Self, std::io::Error> {
        debug!("[GENERATION STARTED] Starting website generation");
        let website = Website { config };
        // Initialize by making sure all output directories are ready
        fs::create_dir_all(&website.config.output_directory)?;
        // Compile Stylesheets
        let css_text = Self::compile_sass("assets/scss/_index.scss");
        let css_path = format!("{}/{}", &website.config.output_directory, "main.css");
        let mut css_file = File::create(&css_path)?;
        css_file.write_all(css_text.as_bytes())?;

        // Create posts
        let posts: Vec<Post> = website.generate_posts()?;
        // Create posts
        let pages = website.generate_pages(posts.clone())?;

        for post in posts {
            let directory = format!(
                "{}/{:04}/{:02}/{:02}",
                &website.config.output_directory, post.year, post.month, post.day
            );
            fs::create_dir_all(directory).expect(
                format!(
                    "[POST DIRECTORY ERROR] Could not create post directory for {}",
                    &post.url
                )
                .as_str(),
            );
            let file_path = format!("{}/{}", &website.config.output_directory, &post.url);
            let mut html_file = File::create(file_path)
                .expect(format!("[POST CREATION ERROR] Could not create {}", &post.url).as_str());

            let (_, html) = Page::BlogPost(post.clone()).generate_html(&registry);
            html_file.write_all(html.as_bytes()).expect(
                format!(
                    "[POST WRITE ERROR] Could not write contents to {}",
                    &post.url
                )
                .as_str(),
            );
        }

        // Create pages
        for page in pages {
            let (file_name, html) = page.generate_html(registry);
            let path = format!("{}/{}", &website.config.output_directory, file_name);
            let mut html_file = File::create(&path)
                .expect(format!("[PAGE CREATION ERROR] Could not create {}", &path).as_str());
            html_file
                .write_all(html.as_bytes())
                .expect(format!("[PAGE WRITE ERROR] Could not write {}", &path).as_str());
        }

        // Copy static assets
        // Create asset directory
        let asset_path = format!("{}/{}", &website.config.output_directory, "assets");
        fs::create_dir_all(&asset_path)?;
        // Copy fonts
        let fonts_path = format!("{}/{}", &asset_path, "fonts");
        fs::create_dir_all(&fonts_path)?;
        Self::copy_assets("assets/fonts", &fonts_path)?;
        // Copy images
        let images_path = format!("{}/{}", &asset_path, "images");
        fs::create_dir_all(&images_path)?;
        Self::copy_assets("assets/images", &images_path)?;
        // Copy js
        let js_path = format!("{}/{}", &asset_path, "js");
        fs::create_dir_all(&js_path)?;
        Self::copy_assets("assets/js", &js_path)?;
        debug!("[GENERATION COMPLETE] Website generated");
        Ok(website)
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
    fn generate_pages(&self, posts: Vec<Post>) -> Result<Vec<Page>, std::io::Error> {
        let mut pages: Vec<Page> = vec![];
        let post_meta: Vec<PostMetaData> = posts
            .iter()
            .map(|p| PostMetaData {
                url: p.url.to_string(),
                title: p.title.to_string(),
                month: p.month,
                year: p.year,
                day: p.day,
            })
            .collect();
        for entry in WalkDir::new("assets/templates/pages") {
            let file = entry?;
            if file.path().is_file() {
                if let Some(name_without_extension) = file.path().file_stem() {
                    let name = name_without_extension.to_str().unwrap();
                    let page: Page = match name {
                        "index" => {
                            let mut trimmed_post_meta: Vec<PostMetaData> = post_meta.clone();
                            trimmed_post_meta.truncate(5);
                            Page::Home(PageData {
                                name: "index".to_string(),
                                title: self.config.title.to_string(),
                                subtitle: self.config.subtitle.to_string(),
                                projects: Some(self.config.projects.clone()),
                                projects_json: Some(
                                    json!(self.config.projects.clone()).to_string(),
                                ),
                                posts: Some(trimmed_post_meta),
                            })
                        }
                        "blog" => Page::BlogIndex(BlogData {
                            name: "blog".to_string(),
                            title: "sneaky crow blog".to_string(),
                            subtitle: "self*-awarded :)".to_string(),
                            categories: Some(Self::sort_into_category(posts.clone()).unwrap()),
                        }),
                        _ => Page::Standard(PageData {
                            name: name.to_string(),
                            title: "unknown".to_string(),
                            subtitle: format!("unknown page type - {}", &name),
                            projects: None,
                            posts: None,
                            projects_json: None,
                        }),
                    };

                    pages.push(page)
                }
            }
        }
        Ok(pages)
    }

    /// Gathers all pages based on files in the _posts directory
    fn generate_posts(&self) -> Result<Vec<Post>, std::io::Error> {
        let mut posts: Vec<Post> = vec![];
        for entry in WalkDir::new("_posts") {
            let unwrapped_entry = entry.unwrap();
            if unwrapped_entry.path().is_file() {
                let post = Post::from_markdown(unwrapped_entry.path())?;
                posts.push(post);
            }
        }
        // Create our series from the posts yaml
        let series: Vec<Series> = posts.clone().iter_mut().fold(vec![], |mut series, post| {
            // Check if post has a series
            if post.series_key.is_some() {
                let post_key = &post.clone().series_key.unwrap();
                // Check if we've already generated the Series
                let found_series = series
                    .iter_mut()
                    .find(|s| s.key.to_string() == post_key.to_string());

                match found_series {
                    Some(s) => s.posts.push(post.clone()),
                    None => {
                        series.push(Series {
                            key: post.series_key.as_ref().unwrap().to_string(),
                            posts: vec![post.to_owned()],
                        });
                    }
                };
            }

            return series;
        });

        /* Next we need to inject each relative series into all of their relative posts.
            so the post can parse the table in the template
        */
        for s in &series {
            posts
                .iter_mut()
                .filter(|p| p.series_key.is_some())
                .filter(|p| &p.series_key.clone().unwrap() == &s.key)
                .for_each(|p| p.add_series(s.clone()));
        }

        // Lastly, sort the posts
        Post::sort_posts_by_published_data(&mut posts, true);
        Ok(posts)
    }

    /// Uses [Website::generate_posts] to get posts, and then organizes them into categories
    pub(crate) fn sort_into_category(posts: Vec<Post>) -> Result<Vec<Category>, std::io::Error> {
        let mut categorized_posts = Post::fold_into_categories(posts);
        // Prioritize "software" category
        categorized_posts.sort_by(|a, _b| match a.key.as_ref() {
            "software" => Ordering::Less,
            "gaming" => Ordering::Less,
            _ => Ordering::Greater,
        });
        Ok(categorized_posts)
    }
}
