use axum::{routing::get, Router};
use tracing::{info, Level};
use tracing_subscriber::{filter, layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() {
    let filter = filter::Targets::new()
        .with_target("tower_http::trace::on_response", Level::DEBUG)
        .with_target("tower_http::trace::on_request", Level::DEBUG)
        .with_target("tower_http::trace::make_span", Level::DEBUG)
        .with_default(Level::DEBUG);
    let tracing_layer = tracing_subscriber::fmt::layer();
    tracing_subscriber::registry()
        .with(tracing_layer)
        .with(filter)
        .init();
    // Construct our routes
    let app = Router::new().route("/", get(index));
    // Start the server
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    info!("Listening on: http://{}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn index() -> &'static str {
    "Hello, World"
}
