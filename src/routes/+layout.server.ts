import { getExpirationByMinutes, getFromRedis, saveToRedis } from "$lib/server/redis";
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
      const cachedStream = await getFromRedis("static_stream_status");
      if (cachedStream) {
        // The value is expected to be a string boolean
        pageMeta.isLive = cachedStream === "true";
      } else {
        const stream = await getStaticStream();
        const isStreamLive = stream.live !== null;
        if (isStreamLive) {
          // If the stream is live, cache the result for an hour
          // An hour is usually around the time I stream
          pageMeta.isLive = true;
        }
        // Lastly, save the result to Redis for an hour
        await saveToRedis(
          "static_stream_status",
          isStreamLive.toString(),
          getExpirationByMinutes(60)
        );
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
