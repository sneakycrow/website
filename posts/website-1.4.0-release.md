## Website v1.4.0 has been released!

![](https://media.giphy.com/media/s2qXK8wAvkHTO/giphy.gif)

I released version 1.4.0 of the website today! I wasn't originally plannig to release it until later this week, but yesterday I missed my #30ThingsInDecember (I was watching a Star Wars marathon, I'm sorry), so I thought I could kick off today by releasing some new updates to my site.

You can review the release source code [here](https://github.com/sneakycrow/website/releases/tag/1.4.0). I want to quickly break down the changes (which are in the changelog as well).

### Added

#### <title>
The first addition is going to be proper titles on the Blog page and Blog post pages. This was bugging me after the last release, I'm honestly sort of ashamed that they weren't there in 1.0.0. But they're there now, and that's all that matters.

One cool piece is on the blog posts pages. Since they don't SSR their data (yet ;)), they are briefly loading when the user first opens them. The title will actually dynamically update based on whether the data is still loading or not. It's very brief, but I still think it's pretty cool.

#### Like button

The more major feature I introduced is blog posts having a Like button now. It was my first "official" experience with GraphQL mutations, and the `@apollo/react-hooks` package (aside from useQuery) hooks. 

Initially, I tried doing a combination of `useMutation` with `useSubscription`, but it looks like `useSubscription` only works with websockets (which makes total sense). 

I did realize on the `@apollo/react-hooks` documentation that `useMutation` accepts an option called `refetchQueries`, where I could just refetch the post data to update the likes when the user hits the button.

Initially I was displaying the like count, but then I thought about [Instagram's initiative to remove like counts](https://www.businessinsider.com/instagram-removing-likes-what-it-will-look-like-2019-11). With that in mind, and just generally liking the simplicity of not having the number, I decided not to show the count.

I still needed the like count for updating it, so it's still good that I have it being pulled in, and the experience of messing with `useMutation` a bunch I think is really good.

### Changed

A couple of minor changes were introduced. 
- The font size for links in the footer on mobile was too big, so that should be fixed now so it doesn't cause horizontal scrolling
- "Thoughts" title on the index page changed to "Blog". Thoughts felt weird to me, and a bit too hipster honestly. I figured Blog is clearer on what it is anyway.
- `white-space: nowrap` added to `<code>` tags on the posts page, so that inline code snippets don't get broken into multiple lines

## Conclusion

I'm very happy with this release, however minor it might be. In the next release I'm planning on getting post pagination going, because next week I'll probably have too many posts for one page.