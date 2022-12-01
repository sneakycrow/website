use log::debug;

#[tokio::main]
async fn main() {
    env_logger::init();
    debug!("Starting server at http://localhost:3030/");
    warp::serve(warp::fs::dir("_out"))
        .run(([127, 0, 0, 1], 3030))
        .await;
}
