---
title: "Setting up my own static site generator, part 2 - handlebars & SASS"
---
[In the first part of this series][part 1] we did some basic initial research, and then a "kinda-mvp" of a html file
generator. We also added a Github Actions config for auto-deployment.

In this part, we're going to create our templating system using [handlebars-rust][handlebars-rust]. Afterwards, we'll
insert some CSS using SASS for styling. I'm using [grass][grass] to compile our SCSS.

I have no particularly reason that I decided on these two libraries beyond I'm familiar with handlebars and that I
wanted a simple lib for compiling scss. The reason we're using templating here is mainly for our blog posts, but we'll
take advantage of it for pages too.

Our goal for this part of the series is to generate a stylized index.html from a handlebars template.

First, we create our templates directory alongside


[part 1]:https://sneakycrow.dev/2022/11/26/setting-up-my-own-static-site-generator.html

[handlebars-rust]:https://crates.io/crates/handlebars

[grass]:https://crates.io/crates/grass