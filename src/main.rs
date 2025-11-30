use axum::{Router, response::IntoResponse, routing::get};

#[tokio::main]
async fn main() {
    // Start the tracer
    tracing_subscriber::fmt::init();

    // Create the router
    let app = Router::new().route("/", get(index));

    // Initializer the listener
    let address = "0.0.0.0:3000";
    tracing::info!("Starting server on http://{}", address);
    let listener = tokio::net::TcpListener::bind(address)
        .await
        .expect("Failed to bind to address");

    axum::serve(listener, app)
        .await
        .expect("Failed to start server");
}

async fn index() -> impl IntoResponse {
    "sneakycrow :)".into_response()
}
