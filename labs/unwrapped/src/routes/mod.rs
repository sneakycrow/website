use crate::db;

use axum::{extract::State, routing::get, Router};
use sqlx::PgPool;

pub fn router(pool: PgPool) -> Router {
    Router::new()
        .route("/", get(index))
        .route("/account", get(account))
        .with_state(pool)
}

async fn index() -> &'static str {
    "Hello, World"
}

async fn account(State(pool): State<PgPool>) -> String {
    db::get_account_by_email(&pool).await.unwrap()
}
