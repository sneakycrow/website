import type { Actions, PageServerLoad } from "./$types";
import { getMastodonStatus } from "$lib/motd";
import { getAllPosts } from "$lib/posts";
import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

export const actions: Actions = {
  logout: async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) return fail(401);
    await auth.invalidateSession(session.sessionId); // invalidate session
    locals.auth.setSession(null); // remove cookie
    throw redirect(302, "/"); // redirect to login page
  }
};

export const load = (async ({ locals }) => {
  const statuses = await getMastodonStatus();
  const latestStatus = statuses[0];
  const [mostRecentPost] = await getAllPosts();
  const session = await locals.auth.validate();
  let user = undefined;
  if (session) {
    user = {
      email: session.user.username,
      avatar: session.user.avatar
    };
  }
  return {
    motd: {
      content: latestStatus.content,
      url: latestStatus.url,
      image:
        latestStatus.media_attachments.find(
          (img: { type: string; url: string }) => img.type === "image"
        )?.url ?? undefined
    },
    featuredPost: {
      ...mostRecentPost,
      date: new Date(mostRecentPost.date).toLocaleDateString()
    },
    user
  };
}) satisfies PageServerLoad;
