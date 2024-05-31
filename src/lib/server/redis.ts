import { createClient, type RedisClientType } from "redis";
import { env } from "$env/dynamic/private";

export const getRedisClient = async (): Promise<RedisClientType> => {
  if (!env.REDIS_URL) throw new Error("No REDIS_URL found in env");
  return createClient({
    url: env.REDIS_URL
  });
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

export const saveToRedis = async (
  key: string,
  value: string,
  expiration: number = getExpirationByDays(1) // 1 day
): Promise<void> => {
  try {
    const client = await getRedisClient();
    await client.connect();
    await client.set(key, value);
    await client.expire(key, expiration);
    await client.disconnect();
  } catch (e) {
    console.error(`Could not save to Redis: ${e}`);
  }
};

export const getFromRedis = async (key: string): Promise<string | null> => {
  try {
    const client = await getRedisClient();
    await client.connect();
    const value = await client.get(key);
    await client.disconnect();
    return value;
  } catch (e) {
    console.error(`Could not get from Redis: ${e}`);
    return null;
  }
};

export const TWITCH_STREAM_STATUS = "twitch:stream_status";
export const SPOTIFY_TOP_ARTISTS = "spotify:top_artists";
