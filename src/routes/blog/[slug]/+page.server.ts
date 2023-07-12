import type { PageServerLoad } from "./$types";
import { getPostBySlug } from "$lib/posts";

export const prerender = true;
export const load = (async ({ params }) => {
  const post = await getPostBySlug(params.slug);
  return {
    post
  };
}) satisfies PageServerLoad;
