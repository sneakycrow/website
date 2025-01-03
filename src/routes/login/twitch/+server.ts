import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { twitch } from "$lib/server/auth";

import type { RequestEvent } from "@sveltejs/kit";
import { scopes } from "$lib/server/twitch";

export async function GET(event: RequestEvent): Promise<Response> {
  const state = generateState();
  const url = await twitch.createAuthorizationURL(state, {
    scopes
  });

  event.cookies.set("twitch_oauth_state", state, {
    path: "/",
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  redirect(302, url.toString());
}
