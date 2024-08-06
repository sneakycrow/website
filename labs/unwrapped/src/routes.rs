use crate::{assets::Assets, db};

use axum::{extract::State, response::Html, routing::get, Router};
use sqlx::PgPool;

pub fn router(pool: PgPool) -> Router {
    Router::new()
        .route("/", get(index))
        .route("/account", get(account))
        .with_state(pool)
}

async fn index() -> Html<String> {
    let html_string: String = match Assets::get("index.html") {
        Some(file) => {
            let file = file.to_owned();
            String::from_utf8(file.data.into()).unwrap()
        }
        None => "Error".to_string(),
    };

    Html(html_string)
}

async fn account(State(pool): State<PgPool>) -> String {
    db::get_account_by_email(&pool).await.unwrap()
}
