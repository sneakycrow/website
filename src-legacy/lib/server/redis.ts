import { createClient, type RedisClientType } from "redis";
import { env } from "$env/dynamic/private";

export const getRedisClient = async (): Promise<RedisClientType> => {
  if (!env.REDIS_URL) throw new Error("No REDIS_URL found in env");
  return createClient({
    url: env.REDIS_URL
  });
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

export const saveToRedis = async (
  key: string,
  value: string,
  expiration: number
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
