import type { PageServerLoad } from "./$types";
import type { Post } from "$lib/posts";
import { getPostBySlug, getSeriesByPost } from "$lib/posts";

export const prerender = true;
export const load = (async ({ params }): Promise<{ post: Post | undefined; series: Post[] }> => {
  const post = await getPostBySlug(params.slug);
  if (post && post.series_key) {
    const series = await getSeriesByPost(post);
    return {
      post,
      series
    };
  }
  return {
    post,
    series: []
  };
}) satisfies PageServerLoad;
