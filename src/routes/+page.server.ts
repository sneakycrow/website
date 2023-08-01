import type { PageServerLoad } from "./$types";
import { getMastodonStatus } from "$lib/motd";
import { getAllPosts } from "$lib/posts";

export const prerender = true;

export const load = (async ({ params }) => {
  const statuses = await getMastodonStatus();
  const latestStatus = statuses[0];
  const [mostRecentPost] = await getAllPosts();
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
    }
  };
}) satisfies PageServerLoad;
