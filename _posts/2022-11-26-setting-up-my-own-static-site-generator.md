---
title: "Setting up my own static site generator, part 1 - planning"
---
Recently, I setup this new website re-design. But beyond just a re-design, it's actually a full "re-software"?.
As you may have guessed from the title, I wrote my
own [static site generator for this website](https://github.com/sneakycrow/website), and I'm going to review my
step-by-step process for setting it up.

In this post I'll walk through a simple planning phase, my initial project setup, and basic page generation.

## Planning

My first step in any project is a dedicated planning phase. Too often in the past did I think that flying by the seat of
my pants was going to work out for me. Even when it did, if I properly plan and research what I want to do I have a much
more organized approach, generally, than the latter.

My requirements with jumping off points for implementations:

1. Small static files as my output
    1. Simple binary built in Rust that I can run that produces the html files
2. Support for local markdown files parsed into blog posts
    1. [pulldown-cmark](https://github.com/raphlinus/pulldown-cmark) for parsing markdown into html
    2. [handlebars](https://github.com/sunng87/handlebars-rust) for page templating
3. Support for SASS
    1. [grass](https://github.com/connorskees/grass) for parsing with Rust
4. Support for simple assets (images and fonts)
    1. [walkdir](https://github.com/BurntSushi/walkdir) for walking directories to copy assets
5. Automatic Deployment
    1. [github s3 deploy + cloudfront cache invalidation action](https://github.com/Reggionick/s3-deploy) for deploying
       to S3 and invalidating cache
6. Dynamic UI components using React (as the "templating" language)
    1. [preact](https://preactjs.com/) for a small basic react implementation
        1. using the [htm](https://github.com/developit/htm) library so we dont need a js build step

## Setting up the environment

- first i created my project using cargo
- next i setup the binary to be able to output an html file from a string
- next setup aws s3 + cloudfront (supply terraform config maybe?)
- next i setup github actions deployment
- next i setup handlebars templates
- wrap it up