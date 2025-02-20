import { getFromNats, getKVClient, saveToNats } from "./nats";
import type { KV } from "nats";

// Keys of data we cache
export const TWITCH_STREAM_STATUS = "twitch.stream_status";
export const SPOTIFY_TOP_ARTISTS = "spotify.top_artists";
export const SPOTIFY_RECENT_TRACKS = "spotify.recent_tracks";
export const STEAM_OWNED_GAMES = "steam.owned_games";

export const getCacheClient = async (): Promise<KV> => {
  return await getKVClient();
};

// A function for getting an expiration by days
export const getExpirationByDays = (days: number): number => {
  // 1 day = 24 hours = 24 * 60 minutes = 24 * 60 * 60 seconds
  return days * 24 * 60 * 60;
};

// A function for getting an expiration by minutes
// Returns the number of seconds in the given number of minutes
export const getExpirationByMinutes = (minutes: number): number => {
  return minutes * 60;
};

export const saveToCache = async (
  key: string,
  value: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  expiration: number = getExpirationByDays(1) // 1 day
): Promise<void> => {
  // Currently, NATS doesn't support key based expiration
  // This looks to be planned for the next release
  // TODO: Implement key based expiration when NATS supports it
  return await saveToNats(key, value);
};

export const getFromCache = async (key: string): Promise<string | null> => {
  return await getFromNats(key);
};
