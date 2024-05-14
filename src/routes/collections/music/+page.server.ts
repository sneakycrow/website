import type { PageServerLoad } from "./$types";
import { getSneakyCrowTopArtists } from "$lib/spotify";
import { getExpirationByDays, getFromRedis, getRedisClient, saveToRedis } from "$lib/server/redis";

export const load: PageServerLoad = async () => {
  // BUG: In production this causes the app to crash
  const redisClient = await getRedisClient();
  const cachedArtistData = await getFromRedis("sneaky-crow-top-artists", redisClient);
  if (cachedArtistData) {
    console.log("Using cached artist data");
    return {
      artists: JSON.parse(cachedArtistData)
    };
  }
  const artistData = await getSneakyCrowTopArtists();
  if (artistData) {
    await saveToRedis(
      "sneaky-crow-top-artists",
      JSON.stringify(artistData),
      redisClient,
      getExpirationByDays(7)
    );
  }
  await redisClient.quit();

  return {
    artists: artistData
  };
};
