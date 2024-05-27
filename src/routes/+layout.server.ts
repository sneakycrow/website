import { getStaticStream } from "$lib/twitch";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, route }) => {
  const pageMeta = {
    title: {
      text: "Sneaky Crow",
      link: "/"
    },
    isLive: false,
    description:
      "Zachary Corvidae's personal website. A collection of thoughts, ideas, and projects."
  };
  if (route.id === "/") {
    // Check if I'm live on Twitch
    // Don't let this prevent the page from loading
    try {
      const stream = await getStaticStream();
      if (stream.live) {
        pageMeta.isLive = true;
      }
    } catch (e) {
      console.error(`Could not get Twitch stream status: ${e}`);
    }
  }
  if (route.id?.startsWith("/blog")) {
    pageMeta.title.text = "Brain Juice";
    pageMeta.title.link = "/blog";
    pageMeta.description = "A collection of thoughts and ideas.";
  }

  if (route.id?.startsWith("/music")) {
    pageMeta.title.text = "Bad Taste";
    pageMeta.title.link = "/collections/music";
    pageMeta.description = "A collection of music.";
  }

  if (route.id === "/collections") {
    pageMeta.title.text = "Treasure Trash";
    pageMeta.title.link = "/collections";
    pageMeta.description = "A collection of collections.";
  }

  if (!locals.user) return pageMeta;
  return {
    username: locals.user.username,
    avatar: locals.user.avatar,
    ...pageMeta
  };
};
