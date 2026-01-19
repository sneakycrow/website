import { env } from "$env/dynamic/private";
import { connect, type JetStreamClient, type KV, type NatsConnection } from "nats";
import { getExpirationByDays } from "./cache";

export const getNatsConnection = async (): Promise<NatsConnection> => {
  if (!env.NATS_URL) throw new Error("No NATS_URL found in env");
  const servers = env.NATS_URL;
  return await connect({
    servers: servers.split(",")
  });
};

export const getJetstreamClient = async (): Promise<JetStreamClient> => {
  const nc = await getNatsConnection();
  const js = nc.jetstream();
  return js;
};

export const getKVClient = async (): Promise<KV> => {
  const js = await getJetstreamClient();
  return await js.views.kv("sneakycrow_web", {
    ttl: getExpirationByDays(1)
  });
};

export const getFromNats = async (key: string): Promise<string | null> => {
  try {
    const client = await getKVClient();
    const value = await client.get(key);
    return value?.string() ?? null;
  } catch (e) {
    console.error(`Could not get from Nats: ${e}`);
    return null;
  }
};

export const saveToNats = async (key: string, value: string): Promise<void> => {
  try {
    const client = await getKVClient();
    await client.put(key, value);
  } catch (e) {
    console.error(`Could not save to Nats: ${e}`);
  }
};
