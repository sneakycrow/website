use axum::{routing::get, Router};

pub fn router() -> Router {
    Router::new().route("/", get(index))
}

async fn index() -> &'static str {
    "Hello, World"
}
