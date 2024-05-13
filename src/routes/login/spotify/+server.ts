import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { spotify } from "$lib/server/auth";

import type { RequestEvent } from "@sveltejs/kit";
import { scopes } from "$lib/spotify";

export async function GET(event: RequestEvent): Promise<Response> {
  const state = generateState();
  const url = await spotify.createAuthorizationURL(state, {
    scopes
  });

  event.cookies.set("spotify_oauth_state", state, {
    path: "/",
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  throw redirect(302, url.toString());
}
