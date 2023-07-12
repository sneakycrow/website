import type { PageServerLoad } from "./$types";
import { getAllPosts } from "$lib/posts";

export const prerender = true;
export const load = (async ({ params }) => {
  return {
    posts: await getAllPosts()
  };
}) satisfies PageServerLoad;
