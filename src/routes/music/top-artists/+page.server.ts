import type { PageServerLoad } from "./$types";
import { getSneakyCrowTopArtists } from "$lib/server/spotify";
import {
  SPOTIFY_TOP_ARTISTS,
  getFromRedis,
  saveToRedis,
  getExpirationByDays
} from "$lib/server/redis";

export const load: PageServerLoad = async () => {
  const cachedArtistData = await getFromRedis(SPOTIFY_TOP_ARTISTS);
  if (cachedArtistData) {
    return {
      artists: JSON.parse(cachedArtistData)
    };
  }
  const artistData = await getSneakyCrowTopArtists();
  if (artistData) {
    await saveToRedis(
      SPOTIFY_TOP_ARTISTS,
      JSON.stringify(artistData),
      getExpirationByDays(7)
    );
  }
  return {
    artists: artistData
  };
};
