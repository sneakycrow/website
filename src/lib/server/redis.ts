import { env } from "$env/dynamic/private";
import { Redis } from "ioredis";

export const getRedisClient = async (): Promise<Redis> => {
  const port = env.REDIS_PORT;
  const host = env.REDIS_HOST;
  const username = env.REDIS_USERNAME;
  const password = env.REDIS_PASSWORD;
  if (!port) throw new Error("No REDIS_PORT found in env");
  if (!host) throw new Error("No REDIS_HOST found in env");
  if (!username) throw new Error("No REDIS_USERNAME found in env");
  if (!password) throw new Error("No REDIS_PASSWORD found in env");
  const client = new Redis({
    host,
    port: parseInt(port),
    username,
    password,
    maxRetriesPerRequest: 1
  });

  client.on("error", (err) => {
    console.error("Redis error", err);
  });

  return client;
};

// A function for getting an expiration by days
export const getExpirationByDays = (days: number): number => {
  // 1 day = 24 hours = 24 * 60 minutes = 24 * 60 * 60 seconds
  return days * 24 * 60 * 60;
};

export const saveToRedis = async (
  key: string,
  value: string,
  client: Redis,
  expiration: number = getExpirationByDays(1) // 1 day
): Promise<void> => {
  await client.set(key, value);
  await client.expire(key, expiration);
};

export const getFromRedis = async (key: string, client: Redis): Promise<string | null> => {
  const value = await client.get(key);
  return value;
};
