use std::path::{Path, PathBuf};

use pulldown_cmark::{html, CodeBlockKind, CowStr, Event, Options, Parser, Tag};
use serde::{Deserialize, Serialize};
use syntect::highlighting::ThemeSet;
use syntect::html::highlighted_html_for_string;
use syntect::parsing::SyntaxSet;

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

        // parse markdown
        let markdown_content = &contents[end_of_yaml..];
        let mut options = Options::empty();
        options.insert(Options::ENABLE_STRIKETHROUGH);
        let parser = Parser::new_ext(&markdown_content, options);

        let mut markdown = String::new();
        let mut modified_parser = Vec::new();
        let mut to_highlight = String::new();

        // Setup for syntect to highlight (specifically) Rust code
        let ss = SyntaxSet::load_defaults_newlines();

        let ts = ThemeSet::load_from_folder("_themes")
            .expect("[THEME LOAD ERROR] Cannot load _themes folder");
        let theme = &ts.themes["dracula"];

        // And track a little bit of state
        let mut in_code_block = false;

        for event in parser {
            match event {
                Event::Start(Tag::CodeBlock(_)) => {
                    // In actual use you'd probably want to keep track of what language this code is
                    in_code_block = true;
                }
                Event::End(Tag::CodeBlock(kind)) => {
                    if in_code_block {
                        let syntax = match kind {
                            CodeBlockKind::Fenced(lang) => match ss.find_syntax_by_token(&lang) {
                                Some(val) => val,
                                None => ss.find_syntax_plain_text(),
                            },
                            _ => ss.find_syntax_plain_text(),
                        };
                        // Format the whole multi-line code block as HTML all at once
                        let html = highlighted_html_for_string(&to_highlight, &ss, &syntax, &theme)
                            .expect("[SYNTAX HIGHLIGHT ERROR] Could not highlight html for string");
                        // And put it into the vector
                        modified_parser.push(Event::Html(CowStr::from(html)));
                        to_highlight = String::new();
                        in_code_block = false;
                    }
                }
                Event::Text(t) => {
                    if in_code_block {
                        // If we're in a code block, build up the string of text
                        to_highlight.push_str(&t);
                    } else {
                        modified_parser.push(Event::Text(t))
                    }
                }
                e => {
                    modified_parser.push(e);
                }
            }
        }

        // Now we send this new vector of events off to be transformed into HTML
        html::push_html(&mut markdown, modified_parser.into_iter());

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
