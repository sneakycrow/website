import { createClient, type RedisClientType } from "redis";
import { env } from "$env/dynamic/private";

export const getRedisClient = async (): Promise<RedisClientType> => {
  if (!env.REDIS_URL) throw new Error("No REDIS_URL found in env");
  return createClient({
    url: env.REDIS_URL
  });
};

// A month converted to seconds
const DEFAULT_EXPIRATION = 60 * 60 * 24 * 30;
export const saveToRedis = async (
  key: string,
  value: string,
  expiration: number = DEFAULT_EXPIRATION
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
