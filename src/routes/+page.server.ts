import { getAllPosts, type Post } from "$lib/posts";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

type LoadOutput = {
  posts: Post[];
  username?: string;
  avatar?: string;
};

export const load: PageServerLoad = async ({ locals }) => {
  let output: LoadOutput = {
    posts: []
  };
  // Get session
  try {
    const session = await locals.auth.validate();
    if (session) {
      output.username = session.user.username;
      output.avatar = session.user.avatar;
    }
  } catch (e) {
    console.error(`Could not load page on server ${e}`);
  }
  // Get posts
  try {
    const posts = await getAllPosts();
    // Trim to 3 most recent posts
    const trimmedPosts = posts.slice(0, 4);
    output.posts = trimmedPosts.map((p) => {
      return {
        ...p,
        slug: `/blog/${p.slug}`
      };
    });
  } catch (e) {
    console.error(`Could not load page on server ${e}`);
  }

  return output;
};

export const actions: Actions = {
  logout: async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) return fail(401);
    await auth.invalidateSession(session.sessionId); // invalidate session
    locals.auth.setSession(null); // remove cookie
    throw redirect(302, "/"); // redirect to login page
  }
};
