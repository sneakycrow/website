import { OAuth2RequestError } from "arctic";
import { twitch, lucia } from "$lib/server/auth";

import type { RequestEvent } from "@sveltejs/kit";
import {
  connectAccountToUser,
  createUserFromProvider,
  getUserAccountProviderByUserId,
  getUserByEmail
} from "$lib/server/user";
import { getUser, validateToken } from "$lib/server/twitch";

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("twitch_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens = await twitch.validateAuthorizationCode(code);
    const validateResponse = await validateToken(tokens.accessToken);
    const twitchUser = await getUser(validateResponse.user.id, tokens.accessToken);

    const existingUser = await getUserByEmail(twitchUser.email);

    if (existingUser) {
      const account = await getUserAccountProviderByUserId("twitch", existingUser.id);
      if (!account) {
        // The user exists, but doesn't have a spotify account connected
        // Connect the spotify account
        await connectAccountToUser({
          provider: "twitch",
          providerId: validateResponse.user.id,
          userId: existingUser.id,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken
        });
      }
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } else {
      const user = await createUserFromProvider("twitch", {
        providerId: validateResponse.user.id,
        username: validateResponse.user.name,
        accessToken: tokens.accessToken,
        email: twitchUser.email,
        avatar: twitchUser.avatar
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
    console.error(`Unknown error occurred, ${e}`);
    return new Response(null, {
      status: 500
    });
  }
}
