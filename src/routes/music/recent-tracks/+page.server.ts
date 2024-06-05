import type { PageServerLoad } from "./$types";
import { getSneakyCrowRecentTracks } from "$lib/spotify";
import {
  SPOTIFY_RECENT_TRACKS,
  getFromRedis,
  saveToRedis,
  getExpirationByDays
} from "$lib/server/redis";

export const load: PageServerLoad = async () => {
  const cachedRecentTracksData = await getFromRedis(SPOTIFY_RECENT_TRACKS);
  if (cachedRecentTracksData) {
    return {
      tracks: JSON.parse(cachedRecentTracksData)
    };
  }
  const recentTracksData = await getSneakyCrowRecentTracks();
  if (recentTracksData) {
    await saveToRedis(
      SPOTIFY_RECENT_TRACKS,
      JSON.stringify(recentTracksData),
      getExpirationByDays(1)
    );
  }
  return {
    tracks: recentTracksData
  };
};
