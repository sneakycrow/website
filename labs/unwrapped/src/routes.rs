use crate::{
    assets::Assets,
    db::{self, Tokens},
    music::spotify::{RecentTrack, SpotifyClient},
};
use serde::Serialize;

use axum::{extract::State, response::Html, routing::get, Json, Router};
use sqlx::PgPool;

pub fn router(pool: PgPool) -> Router {
    Router::new()
        .route("/", get(index))
        .route("/collect", get(collect))
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

#[derive(Serialize)]
pub struct CollectionResponse {
    data: Vec<RecentTrack>,
}

async fn collect(State(pool): State<PgPool>) -> Json<CollectionResponse> {
    let tokens = db::get_tokens_by_email(&pool, "zach@sneakycrow.dev".to_string())
        .await
        .unwrap();

    let tracks = SpotifyClient::new(tokens)
        .get_recent_tracks()
        .await
        .expect("Failed to fetch recent tracks");

    Json(CollectionResponse { data: tracks.items })
}
