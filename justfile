image_name := "github.com/sneakycrow/website"
image_tag  := "latest"

set dotenv-load

build-docker:
    docker build -t {{image_name}}:{{image_tag}} .

gaml FILE:
    cargo run -p gaml --bin gaml -- {{FILE}}

unwrap:
    cargo run -p unwrapped
