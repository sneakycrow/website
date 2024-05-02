import { auth, githubAuth } from "$lib/server/lucia.js";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { RequestEvent } from "@sveltejs/kit";

export const GET = async ({ url, cookies, locals }: RequestEvent) => {
  const storedState = cookies.get("github_oauth_state");
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    console.log("farts", storedState, state, storedState !== state, code);
    return new Response(null, {
      status: 400
    });
  }
  try {
    const { createUser, githubUser, getExistingUser } = await githubAuth.validateCallback(code);
    const existingUser = await getExistingUser();
    const getUser = async () => {
      if (existingUser) return existingUser;
      const { email, login, avatar_url } = githubUser;
      if (!login) throw new Error("Github user does not have username");
      return await createUser({
        attributes: {
          username: login,
          avatar: avatar_url
        }
      });
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });
    locals.auth.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });
  } catch (e) {
    console.error(`Error authorizing user ${e}`);
    if (e instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
};
