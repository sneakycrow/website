use std::path::{Path, PathBuf};

use pulldown_cmark::{html, Options, Parser};
use serde::{Deserialize, Serialize};

#[derive(Debug, PartialEq, Deserialize)]
struct YamlHeader {
    title: String,
}

#[derive(Serialize, Clone)]
pub(crate) struct Post {
    pub(crate) filename: String,
    pub(crate) title: String,
    pub(crate) year: i32,
    pub(crate) show_year: bool,
    pub(crate) month: u32,
    pub(crate) day: u32,
    pub(crate) contents: String,
    pub(crate) url: String,
    pub(crate) published: String,
    pub(crate) updated: String,
    pub(crate) markdown: String,
}

impl Post {
    pub(crate) fn from_markdown(path: &Path) -> Result<Post, std::io::Error> {
        let filename = path.file_name().unwrap().to_str().unwrap();
        let mut split = filename.splitn(4, "-");
        let year = split.next().unwrap().parse::<i32>().unwrap();
        let month = split.next().unwrap().parse::<u32>().unwrap();
        let day = split.next().unwrap().parse::<u32>().unwrap();
        let filename = split.next().unwrap().to_string();

        let contents = std::fs::read_to_string(path)?;

        // yaml headers.... we know the first four bytes of each file are "---\n"
        // so we need to find the end. we need the fours to adjust for those first bytes
        let end_of_yaml = contents[4..].find("---").unwrap() + 4;
        let yaml = &contents[..end_of_yaml];
        let YamlHeader { title } =
            serde_yaml::from_str(yaml).expect("[YAML ERROR] Could not parse yaml header");

        let markdown_content = &contents[end_of_yaml..];
        let mut options = Options::empty();
        options.insert(Options::ENABLE_STRIKETHROUGH);
        let parser = Parser::new_ext(&markdown_content, options);

        let mut markdown = String::new();
        html::push_html(&mut markdown, parser);

        // finally, the url.
        let mut url = PathBuf::from(&*filename);
        url.set_extension("html");

        // this is fine
        let url = format!(
            "{:04}/{:02}/{:02}/{}",
            year,
            month,
            day,
            url.to_str().unwrap()
        );

        let published = Self::build_post_time(year, month, day, 0);
        let updated = published.clone();

        Ok(Self {
            filename,
            title,
            year,
            show_year: false,
            month,
            day,
            contents,
            url,
            published,
            updated,
            markdown,
        })
    }

    fn build_post_time(year: i32, month: u32, day: u32, seconds: u32) -> String {
        chrono::DateTime::<chrono::Utc>::from_utc(
            chrono::NaiveDate::from_ymd_opt(year, month, day)
                .unwrap()
                .and_hms_opt(0, 0, seconds)
                .unwrap(),
            chrono::Utc,
        )
        .to_rfc3339()
    }
}
