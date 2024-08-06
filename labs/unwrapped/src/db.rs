use axum::http::StatusCode;
use serde::Serialize;
use sqlx::postgres::{PgPool, PgPoolOptions};
use tracing::info;

#[derive(Serialize)]
pub struct Tokens {
    pub access_token: String,
    pub refresh_token: String,
}

// A function for getting the account of a user based on their email
pub async fn get_tokens_by_email(
    pool: &PgPool,
    email: String,
) -> Result<Tokens, (StatusCode, String)> {
    // get the account.refreshToken and account.accessToken from the database based on the user.email
    sqlx::query!(
        "SELECT a.\"accessToken\", a.\"refreshToken\" from \"User\" u JOIN \"Account\" a on a.\"userId\" = u.id WHERE u.email = $1 AND a.provider = $2",
        email,
        "spotify"
    )
    .fetch_one(pool)
    .await
    .map(|row| {
        Tokens {
            access_token: row.accessToken.expect("No access token found"),
            refresh_token: row.refreshToken.expect("No refresh token found")
        }
    })
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
