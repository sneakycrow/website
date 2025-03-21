import type { PageServerLoad } from "./$types";
import { getSneakyCrowRecentTracks } from "$lib/server/spotify";
import {
  SPOTIFY_RECENT_TRACKS,
  getFromCache,
  saveToCache,
  getExpirationByMinutes
} from "$lib/server/cache";

export const load: PageServerLoad = async () => {
  const cachedRecentTracksData = await getFromCache(SPOTIFY_RECENT_TRACKS);
  if (cachedRecentTracksData) {
    return {
      tracks: JSON.parse(cachedRecentTracksData)
    };
  }
  const recentTracksData = await getSneakyCrowRecentTracks();
  if (recentTracksData) {
    await saveToCache(
      SPOTIFY_RECENT_TRACKS,
      JSON.stringify(recentTracksData),
      getExpirationByMinutes(60)
    );
  }
  return {
    tracks: recentTracksData
  };
};
