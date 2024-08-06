use axum::http::StatusCode;
use sqlx::postgres::{PgPool, PgPoolOptions};

// A function for getting the account of a user based on their email
pub async fn get_account_by_email(pool: &PgPool) -> Result<String, (StatusCode, String)> {
    sqlx::query_scalar("select email from \"User\"")
        .fetch_one(pool)
        .await
        .map_err(internal_error)
}

// A function for getting a pool of database connections
pub async fn get_pool() -> Result<sqlx::PgPool, sqlx::Error> {
    let db_string = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_string)
        .await
        .expect("Failed to create database pool");

    Ok(pool)
}

/// Utility function for mapping any error into a `500 Internal Server Error`
/// response.
fn internal_error<E>(err: E) -> (StatusCode, String)
where
    E: std::error::Error,
{
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}
