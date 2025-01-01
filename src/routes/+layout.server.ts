import { keywords } from "$lib";
import {
  TWITCH_STREAM_STATUS,
  getExpirationByMinutes,
  getFromRedis,
  saveToRedis
} from "$lib/server/redis";
import { getStaticStream } from "$lib/server/twitch";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, route }) => {
  const pageMeta = {
    title: {
      text: "Sneaky Crow",
      link: "/"
    },
    isLive: false,
    description:
      "Sneaky Crow, aka Zachary Corvidae, is a software engineer and artist. This website serves as a hub for his published work and experiments",
    keywords
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
    pageMeta.description =
      "Where thoughts go to party and occasionally make sense. Enter at your own risk of enlightenment or confusion.";
  }

  if (route.id?.startsWith("/music")) {
    pageMeta.title.text = "Bad Taste";
    pageMeta.title.link = "/music";
    pageMeta.description =
      "Where musical boundaries are shattered, eardrums are challenged, and your neighbors secretly plan their revenge.";
  }

  if (route.id?.startsWith("/games")) {
    pageMeta.title.text = "Escape Now";
    pageMeta.title.link = "/games";
    pageMeta.description =
      "A collection of digital adventures, virtual worlds, and the countless hours spent 'just one more turn'-ing.";
  }

  if (route.id?.startsWith("/art/photos")) {
    pageMeta.title.text = "Writing Light";
    pageMeta.title.link = "/art/photos";
    pageMeta.description =
      "Capturing moments, freezing time, and occasionally taking accidental selfies with the lens cap on.";
  }

  if (!locals.user) return pageMeta;
  return {
    username: locals.user.username,
    avatar: locals.user.avatar,
    role: locals.user.role,
    ...pageMeta
  };
};
