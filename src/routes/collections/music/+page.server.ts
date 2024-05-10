import type { PageServerLoad } from "./$types";
import { getSneakyCrowTopArtists } from "$lib/spotify";
import { getExpirationByDays, getFromRedis, saveToRedis } from "$lib/server/redis";

export const load: PageServerLoad = async () => {
  const cachedArtistData = await getFromRedis("sneaky-crow-top-artists");
  if (cachedArtistData) {
    return {
      artists: JSON.parse(cachedArtistData)
    };
  }
  const artistData = await getSneakyCrowTopArtists();
  if (artistData) {
    await saveToRedis(
      "sneaky-crow-top-artists",
      JSON.stringify(artistData),
      getExpirationByDays(7)
    );
  }
  return {
    artists: artistData
  };
};
