import {
  TWITCH_STREAM_STATUS,
  getExpirationByMinutes,
  getFromRedis,
  saveToRedis
} from "$lib/server/redis";
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
      // First check the cache
      let isStreamLive: boolean = false;
      const cachedStream = await getFromRedis(TWITCH_STREAM_STATUS);
      if (cachedStream) {
        isStreamLive = cachedStream === "true";
      } else {
        // If it's not in the cache, check Twitch directly
        const stream = await getStaticStream();
        const isStreamLive: boolean = stream.live !== null;
        if (isStreamLive) {
          pageMeta.isLive = true;
        }
        // Cache the result for 30 minutes
        await saveToRedis(
          TWITCH_STREAM_STATUS,
          isStreamLive.toString(),
          getExpirationByMinutes(30)
        );
      }
      // If the stream is live, update the page meta
      if (isStreamLive) {
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
