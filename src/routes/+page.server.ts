import { getAllPosts, type Post } from "$lib/posts";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

export const load: PageServerLoad = async ({ locals }) => {
  try {
    const session = await locals.auth.validate();

    const posts = await getAllPosts();
    // Trim to 3 most recent posts
    const trimmedPosts = posts.slice(0, 3);
    const postsWithPrefix: Post[] = trimmedPosts.map((p) => {
      return {
        ...p,
        slug: `/blog/${p.slug}`
      };
    });
    if (!session) return { posts: postsWithPrefix };
    return {
      posts: postsWithPrefix,
      username: session.user.username,
      avatar: session.user.avatar
    };
  } catch (e) {
    console.error(`Could not load page on server ${e}`);
    return { posts: [] };
  }
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
