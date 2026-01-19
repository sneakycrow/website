import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { adapter } from "./db";
import { Discord, GitHub, Spotify, Twitch } from "arctic";
import { env } from "$env/dynamic/private";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      avatar: attributes.avatar,
      username: attributes.username,
      role: attributes.role
    };
  }
});

export const github = new GitHub(env.GITHUB_ID ?? "", env.GITHUB_SECRET ?? "");
export const spotify = new Spotify(
  env.SPOTIFY_ID ?? "",
  env.SPOTIFY_SECRET ?? "",
  env.SPOTIFY_REDIRECT_URI ?? ""
);
export const twitch = new Twitch(
  env.TWITCH_ID ?? "",
  env.TWITCH_SECRET ?? "",
  env.TWITCH_REDIRECT_URI ?? ""
);
export const discord = new Discord(
  env.DISCORD_ID ?? "",
  env.DISCORD_SECRET ?? "",
  env.DISCORD_REDIRECT_URI ?? ""
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  avatar: string;
  username: string;
  role: string;
}
