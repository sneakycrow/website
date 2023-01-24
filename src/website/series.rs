use serde::Serialize;

use crate::website::post::Post;

#[derive(Serialize, Clone)]
pub(crate) struct Series {
    pub(crate) key: String,
    pub(crate) posts: Vec<Post>,
}

impl Series {}
