import type { PageServerLoad } from "./$types";
import { getSneakyCrowTopArtists } from "$lib/server/spotify";
import {
  SPOTIFY_TOP_ARTISTS,
  getFromCache,
  saveToCache,
  getExpirationByDays
} from "$lib/server/cache";

export const load: PageServerLoad = async () => {
  const cachedArtistData = await getFromCache(SPOTIFY_TOP_ARTISTS);
  if (cachedArtistData) {
    return {
      artists: JSON.parse(cachedArtistData)
    };
  }
  const artistData = await getSneakyCrowTopArtists();
  if (artistData) {
    await saveToCache(SPOTIFY_TOP_ARTISTS, JSON.stringify(artistData), getExpirationByDays(7));
  }
  return {
    artists: artistData
  };
};
