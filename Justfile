image_name := "github.com/sneakycrow/website"
image_tag  := "latest"

build-docker:
    docker build -t {{image_name}}:{{image_tag}} .
