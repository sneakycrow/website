Over the majority of 2019 I've been practicing Rust. One service that I've fell in love with in general is [now.sh](https://now.sh). Now.sh allows serverless function deployment, and that includes using community builders so you can use your own custom language.

In this tutorial we'll be utilizing the [now-rust](https://github.com/mike-engel/now-rust) for deployment, and [image-rs](https://github.com/image-rs/image) for quickly generating a image to server.

## init

First thing we need to generate is our new project. Normally, we'd directly initialize a cargo project, but this project will have a special file architecture.

Create a new directory `mkdir placeholder-example` and `cd placeholder-example`

`placeholder-example` is going to be our project root. We'll want to create a cargo project within this folder.

`cargo new api` to create our api project. This is going to be our primary api endpoint.

Next we'll want to create a `now.json` file in the root directory.

Your folder structure should now look like this

placeholder-example
 - now.json
 - api
  - Cargo.toml
  - src
    - main.rs

## configuring now.sh

Next we're going to want to configure the now.json file to serve our serverless function. The primary piece we're going to need is telling now what builder to use. Make your `now.json` file look like this

```json
{
  "functions": {
    "api/**/*.rs": {
      "runtime": "now-rust@1.0.1"
    }
  }
}
```

This is going to tell now which runtime that any `.rs` file within our api folder should use the [now-rust](https://github.com/mike-engel/now-rust)

Next let's move on to configuring the serverless function itself

## adding our dependencies

We're going to want to add our dependencies first. Open `api/Cargo.toml` and add these dependencies to it. 

```toml
...

[dependencies]
image = "0.22.3"
http = "0.1"
now_lambda = "0.1"
```

The [image-rs](https://github.com/image-rs/image) is going to be for serving our generated image. The [http](https://github.com/hyperium/http) is going to be for wrapping our function into an http handler, and the [now_lambda](https://crates.io/crates/now_lambda) is a wrapper that configures that lambda functionality for us

## configuring our image handler

Now for the juicy stuff! We finally get to configure the actual handler!

![](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif)

Don't worry if you're new to Rust like I am! It's only a few lines of code!

For this part, we're actually going to delete our src folder. We don't really need any binary or anything, now is going to handle all that for us. So remove the `api/src` folder and create a new file in the api folder called `placeholder.rs`
 
Your folder structure should now look like this

placeholder-example
- now.json
- api
  - Cargo.toml
  - placeholder.rs

Open `api/placeholder.rs` and add our dependencies to the top of the file

```rust
use http::{StatusCode};
use now_lambda::{error::NowError, IntoResponse, Request, Response};
use image::{DynamicImage};
use image::ImageOutputFormat::PNG;
```

For http we're simply utilizing a status code. For now_lambda we're utilizing it's wrapper around http to server our requests, and responses. For image, we're utilizing the DynamicImage enum for actually generating our image, and then we're also utilizing image's ImageOutputFormat to output into a PNG

We need to create a `handler` function that accepts a Request and outputs a Result. We want to allow our users to supploy a *width* and a *height* via the path in the URL, so we'll want to decode those two things from the path in the URL.
Once we have our width and height we can generate a new image, convert it into a buffer, then convert it into a PNG, and then server that image in the response. 

That's going to look like this in your `api/placeholder.rs` file

```rust
use http::{StatusCode};
use now_lambda::{error::NowError, IntoResponse, Request, Response};
use image::{DynamicImage};
use image::ImageOutputFormat::PNG;

fn handler(req: Request) -> Result<impl IntoResponse, NowError> {
  // Get the path
  let uri = req.uri();
  // Split the path
  let uri_split = uri.path().split("/");
  // Create a Vector containing each parameter
  let parameters = uri_split.collect::<Vec<&str>>();
  // The first parameter [1] (0 is the first "/") and the second parameter [2] are our values for (x, y)
  let img_x = parameters[1].parse::<u32>().unwrap();
  let img_y = parameters[2].parse::<u32>().unwrap();
  // Create our buffer for serving later
  let mut buffer = Vec::new();
  // Create our dynamic image
  let img = DynamicImage::new_rgb8(img_x, img_y);
  // Write to our buffer
  img.write_to(&mut buffer, PNG);
  // Build our response
  let response = Response::builder().status(StatusCode::OK).header("Content-Type", "image/png").body(buffer).expect("Interal Server Error");
  // Server our response
  Ok(response)
}
```

Now we have our function! Yay! The last thing we need to do is configure our `now.json` file to look for a specific path when serving our handler. If we don't have those width and height the function will fail.

So open your `now.json` file and add these lines:

```json
{
  "functions": {
    "api/**/*.rs": {
      "runtime": "now-rust@1.0.1"
    }
  },
  "routes": [
    { "src": "/([0-9]+)/([0-9]+)", "dest": "/api/image.rs" }
  ]
}
```

This just tells now.json that when the user requests http://example.com/[digit]/[digit] to server our function.

Last but not least, deploy our new serverless function via the now cli by running `now` in your terminal

Once now deploys your serverless function you should have a working placeholder image generator!


If you have any optimizations or questions, feel free to email me zach@sneakycrow.dev
