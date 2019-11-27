# CSS `mask-image`

Today I stumbled across a website called [The Outline](https://theoutline.com) via [an article](https://theoutline.com/post/8077/social-media-stars-fan-behavior-colleen-ballinger-matt-bellassai?utm_source=pocket-newtab&zd=1&zi=aobumgkm). I went to the homepage of the website and was faced with one of the coolest hero designs I've seen.

![](https://i.snap.as/HbM8Ywv.png)

Now, I will admit that initially I wasn't super impressed. Yea, it looks really cool, but I assumed that the background image was just that, a background image. But then I noticed something. If you look at the top portion of the background image it actually covers the border. Now, it could just be some complex z-indexing, but I wanted to know.

Upon inspect, I discovered that the duck background was actually a 2k image of ducks, *without masking*. The masking itself is a completely separate image. The developers are using a CSS property I hadn't heard of until today called [mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image).

According to MDN:

> The mask-image CSS property sets the image that is used as mask layer for an element.

This is an extremely interesting feature. Of course, I'd love to play with it, but I also was curious what the browser support was. To my surprise, it's actually pretty damn good! It looks like Safari has a few minor issues.

![](https://i.snap.as/bVv76TC.png)

The feature is still considered *experimental*, but considering support and just how damn cool it is, I really want to check it out and see what I can do with it.