use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone)]
pub(crate) struct SignalBoost {
    name: String,
    url: String,
    email: String,
    keywords: Vec<String>,
}
