import type { PageServerLoad } from "./$types";
import type { Post } from "$lib/posts";
import { getAllPosts } from "$lib/posts";

export const prerender = true;
export const load = (async ({ params }): Promise<{ posts: Post[] }> => {
  const posts = await getAllPosts();
  const postsWithPrefix: Post[] = posts.map((p) => {
    return {
      ...p,
      slug: `/blog/${p.slug}`
    };
  });
  return {
    posts: postsWithPrefix
  };
}) satisfies PageServerLoad;
