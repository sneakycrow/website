import { OAuth2RequestError } from "arctic";
import { github, lucia } from "$lib/server/auth";

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
  const storedState = event.cookies.get("github_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const githubUser: GitHubUser = await githubUserResponse.json();
    const existingUser = await getUserByEmail(githubUser.email);

    if (existingUser) {
      const account = await getUserAccountProviderByUserId(
        "github",
        existingUser.id
      );
      if (!account) {
        // The user exists, but doesn't have a github account connected
        // Connect the github account
        await connectAccountToUser({
          provider: "github",
          providerId: githubUser.id.toString(),
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
      const user = await createUserFromProvider("github", {
        providerId: githubUser.id.toString(),
        username: githubUser.login,
        accessToken: tokens.accessToken,
        email: githubUser.email,
        avatar: githubUser.avatar_url
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

interface GitHubUser {
  id: number;
  login: string;
  email: string;
  avatar_url: string;
}
