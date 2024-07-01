import type { PageServerLoad } from "./$types";
import { getSneakyCrowRecentTracks } from "$lib/server/spotify";
import {
  SPOTIFY_RECENT_TRACKS,
  getFromRedis,
  saveToRedis,
  getExpirationByMinutes
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
      getExpirationByMinutes(60)
    );
  }
  return {
    tracks: recentTracksData
  };
};
