use std::collections::HashSet;
use std::fs;
use std::path::Path;

/// Gets all existing series from the _posts directory based on their frontmatter
// TODO: Make this work for drafts as well
// NOTE: Drafts may want to be part of a published series in _posts, so this requires some thought
pub(crate) fn get_existing_series() -> HashSet<String> {
    let mut series_keys = HashSet::new();
    let posts_dir = Path::new("_posts");

    if let Ok(entries) = fs::read_dir(posts_dir) {
        for entry in entries.flatten() {
            if let Ok(content) = fs::read_to_string(entry.path()) {
                if let Some(start) = content.find("series_key:") {
                    if let Some(end) = content[start..].find('\n') {
                        let series_key = content[start + 11..start + end].trim().trim_matches('"');
                        series_keys.insert(series_key.to_string());
                    }
                }
            }
        }
    }

    series_keys
}
