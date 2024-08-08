image_name := "github.com/sneakycrow/website"
image_tag  := "latest"

set dotenv-load := true

build: build-docker
run: run-docker
clean: clean-docker

build-docker:
    docker build -t {{image_name}}:{{image_tag}} .

run-docker:
    docker run -it --rm \
        --name website \
        -p 3000:3000 \
        -e DATABASE_URL="$DATABASE_URL" \
        {{image_name}}:{{image_tag}}

clean-docker:
    docker rmi {{image_name}}:{{image_tag}}

unwrap:
    just labs/unwrapped/run
