use std::fs;
use std::fs::File;
use std::io::{ErrorKind, Write};
use std::process::{ExitCode, Termination};

use chrono::{DateTime, Utc};
use handlebars::Handlebars;
use log::debug;
use walkdir::WalkDir;

use crate::website::config::Config;
use crate::website::page::{Page, PageData, PostMetaData};
use crate::website::post::Post;
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

        website.generate_pages()?.iter().for_each(|p| {
            let (file_name, html) = Page::generate_html(p, registry);
            let path = format!("{}/{}", &website.config.output_directory, file_name);
            let mut html_file = File::create(&path)
                .expect(format!("[PAGE CREATION ERROR] Could not create {}", &path).as_str());
            html_file
                .write_all(html.as_bytes())
                .expect(format!("[PAGE WRITE ERROR] Could not write {}", &path).as_str())
        });

        // Create posts directory
        website.generate_posts()?.iter().for_each(|p| {
            let directory = format!(
                "{}/{:04}/{:02}/{:02}",
                &website.config.output_directory, p.year, p.month, p.day
            );
            fs::create_dir_all(directory).expect(
                format!(
                    "[POST DIRECTORY ERROR] Could not create post directory for {}",
                    &p.url
                )
                .as_str(),
            );
            let file_path = format!("{}/{}", &website.config.output_directory, &p.url);
            let mut html_file = File::create(file_path)
                .expect(format!("[POST CREATION ERROR] Could not create {}", &p.url).as_str());

            let (_, html) = Page::BlogPost(p.clone()).generate_html(&registry);
            html_file.write_all(html.as_bytes()).expect(
                format!("[POST WRITE ERROR] Could not write contents to {}", &p.url).as_str(),
            )
        });

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
    fn generate_pages(&self) -> Result<Vec<Page>, std::io::Error> {
        let mut pages: Vec<Page> = vec![];
        for entry in WalkDir::new("assets/templates/pages") {
            let file = entry?;
            if file.path().is_file() {
                if let Some(name_without_extension) = file.path().file_stem() {
                    let name = name_without_extension.to_str().unwrap();
                    let posts: Vec<Post> = self.generate_posts()?;
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
                    let page: Page = match name {
                        "index" => Page::Home(PageData {
                            name: "index".to_string(),
                            title: self.config.title.to_string(),
                            subtitle: self.config.subtitle.to_string(),
                            projects: self.config.projects.clone(),
                            posts: Vec::from(&post_meta[..3]),
                        }),
                        "blog" => Page::BlogIndex(PageData {
                            name: "blog".to_string(),
                            title: "sneaky crow blog".to_string(),
                            subtitle: "self*-awarded :)".to_string(),
                            posts: post_meta,
                            projects: self.config.projects.clone(),
                        }),
                        _ => Page::Standard(PageData {
                            name: name.to_string(),
                            title: "unknown".to_string(),
                            subtitle: format!("unknown page type - {}", &name),
                            projects: self.config.projects.clone(),
                            posts: post_meta,
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
                    Some(mut s) => s.posts.push(post.clone()),
                    None => {
                        series.push(Series {
                            key: post.series_key.as_ref().unwrap().to_string(),
                            posts: vec![post.clone()],
                        });
                    }
                };
            }

            return series;
        });

        /** Next we need to inject each relative series into all of their relative posts,
           so the post can parse the table in the template
        **/
        for s in &series {
            posts
                .iter_mut()
                .filter(|p| p.series_key.is_some())
                .filter(|p| &p.series_key.clone().unwrap() == &s.key)
                .for_each(|mut p| p.add_series(s.clone()));
        }

        // Lastly, sort the posts
        Post::sort_posts(&mut posts, true);
        Ok(posts)
    }
}
