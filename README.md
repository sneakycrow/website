# website

[![build and upload website](https://github.com/sneakycrow/website/actions/workflows/deploy.yml/badge.svg)](https://github.com/sneakycrow/website/actions/workflows/deploy.yml)

My personal website software. It's a binary, written in Rust, that generates pages, blog posts, and more

### Why write your own

Honestly? I like writing software so when it comes to my own personal projects that aren't funded by any outside
entities but myself, I just like to have fun and write my own stuff.

But a secondary reason that I wanted to do it is I kept finding that my other solutions were wanting. When I used
Next.JS, I got the benefits of utilizing React for fancy components, but uses markdown for basic blog posts was kinda
pita. And I didn't really like having to run a full back-end. Even with static site generation, setting that up in
NextJS isn't exactly "friendly" when utilizing markdown. It just felt messy.

I don't really like Gatsby, honestly. Just personal preference. I tried Jekyll, Hugo, and more and just didn't vibe with
the limitations of the front-end I lost from not having React. I probably could've configured Preact there too, but
/shrug.

### How does it work

It uses [handlebars](https://docs.rs/handlebars/latest/handlebars/) for template generation.
It uses [preact](https://preactjs.com/) for dynamic ui components, utilizing [htm](https://github.com/developit/htm) so
that we don't require any js-specific build steps (and we keep things real small).

Utilizing all of those, it scans the `template/pages` directory for static page generations, then scans `_posts` to
generate blog posts.
