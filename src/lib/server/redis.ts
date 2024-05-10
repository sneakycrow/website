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

export const saveToRedis = async (
  key: string,
  value: string,
  expiration: number = getExpirationByDays(1) // 1 day
): Promise<void> => {
  const client = await getRedisClient();
  await client.connect();
  await client.set(key, value);
  await client.expire(key, expiration);
  await client.disconnect();
};

export const getFromRedis = async (key: string): Promise<string | null> => {
  const client = await getRedisClient();
  await client.connect();
  const value = await client.get(key);
  await client.disconnect();
  return value;
};