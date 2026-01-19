import type { PageServerLoad } from "./$types";
import type { Post } from "$lib/posts";
import { getPosts } from "$lib/posts";

export const load: PageServerLoad = async () => {
  const posts = await getPosts();
  const postsWithPrefix: Post[] = posts.map((p) => {
    return {
      ...p,
      slug: `/blog/${p.slug}`
    };
  });
  return {
    posts: postsWithPrefix
  };
};
