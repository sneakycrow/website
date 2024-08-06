import { OAuth2RequestError } from "arctic";
import { discord, lucia } from "$lib/server/auth";

import type { RequestEvent } from "@sveltejs/kit";
import {
  connectAccountToUser,
  createUserFromProvider,
  getUserAccountProviderByUserId,
  getUserByEmail
} from "$lib/server/user";

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("discord_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const discordUserResponse = await fetch(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      }
    );
    const discordUser: DiscordUser = await discordUserResponse.json();
    // The avatar provided is just a hash, re-assign it to the full URL
    discordUser.avatar = constructDiscordAvatar(
      discordUser.id.toString(),
      discordUser.avatar
    );
    console.log(`Discord user info: ${JSON.stringify(discordUser)}`);
    const existingUser = await getUserByEmail(discordUser.email);
    console.log(`Existing user: ${JSON.stringify(existingUser)}`);
    if (existingUser) {
      const account = await getUserAccountProviderByUserId(
        "discord",
        existingUser.id
      );
      if (!account) {
        // The user exists, but doesn't have a discord account connected
        // Connect the discord account
        await connectAccountToUser({
          provider: "discord",
          providerId: discordUser.id.toString(),
          userId: existingUser.id,
          accessToken: tokens.accessToken
        });
      }
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } else {
      console.log("Creating new user");
      const user = await createUserFromProvider("discord", {
        providerId: discordUser.id.toString(),
        username: discordUser.username,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        email: discordUser.email,
        avatar: discordUser.avatar
      });

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
}

const constructDiscordAvatar = (userId: string, hash: string) => {
  return `https://cdn.discordapp.com/avatars/${userId}/${hash}.png`;
};

interface DiscordUser {
  id: number;
  username: string;
  avatar: string;
  email: string;
  // TODO: Add email and username
}
