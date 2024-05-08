import { OAuth2RequestError } from "arctic";
import { spotify, lucia } from "$lib/server/auth";

import type { RequestEvent } from "@sveltejs/kit";
import { createUserFromProvider, getUserByEmail } from "$lib/server/user";

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("spotify_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens = await spotify.validateAuthorizationCode(code);
    const spotifyUserResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const spotifyUser: SpotifyUser = await spotifyUserResponse.json();
    const existingUser = await getUserByEmail(spotifyUser.email);

    if (existingUser) {
      // TODO: Check if the user has a spotify account connected already, if not, connect it
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } else {
      const user = await createUserFromProvider("spotify", {
        providerId: spotifyUser.id,
        username: spotifyUser.display_name,
        accessToken: tokens.accessToken,
        email: spotifyUser.email,
        avatar: spotifyUser.images[0].url
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

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: { url: string; height: number; width: number }[];
}
