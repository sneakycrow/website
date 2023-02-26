use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub(crate) struct SignalBoost {
    name: String,
    url: String,
    email: String,
    keywords: Vec<String>,
}
