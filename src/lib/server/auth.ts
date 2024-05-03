import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { adapter } from "./db";
import { GitHub } from "arctic";
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
      username: attributes.username
    };
  }
});

export const github = new GitHub(env.GITHUB_ID ?? "", env.GITHUB_SECRET ?? "");

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  avatar: string;
  username: string;
}
