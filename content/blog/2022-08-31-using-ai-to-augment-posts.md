---
title: Using AI to augment blog posts
template: post.html
---
Blog posts are better with pictures, but a lot of the time tech articles are tough to visualize
(and also I'm lazy and don't want to think about visualizing a specific part of a post I'm writing). With all the
hubbub about DALL-E (which is cool as hell), I thought we could use it as well as some other OpenAI tools to
augment these posts.

First off, the easy and probably most fun, using DALL-E to add images. Like this prompt I did:

![3d render of a cute yellow squid playing an arcade game on a dark green background, digital art](/images/articles/dalle_squid.png)
> 3d render of a cute yellow squid playing an arcade game on a dark green background, digital art
>
> [full image on openai](https://labs.openai.com/s/OfkbO0pmBsLtfVtrIlYGMnfs)

Super cool, I know. Thanks Billy, but DALL-E did all the work.

Unfortunately, as of writing this article on August 31st, 2022, DALL-E does not seem to have
an automagical way (REST API or something like it) to get generated images from. I also read on some internet forum
that trying to do that at all right now breaks the ToS or something yadda yadda. Anyways, not something I can do yet I
guess.

BUT! There are other ideas I have for augmenting some of these blog posts with AI.

Like, what if I could use OpenAI to generate the blog
excerpts. [OpenAI has an interesting Text Completion API](https://beta.openai.com/docs/guides/completion) that looks
promising.