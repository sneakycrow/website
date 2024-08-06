import type { PageServerLoad } from "./$types";
import type { Post } from "$lib/posts";
import { getPostBySlug, getSeriesByPost } from "$lib/posts";

export const load = (async ({
  params
}): Promise<{ post: Post; series: Post[] }> => {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    throw new Error("post not found");
  }
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
