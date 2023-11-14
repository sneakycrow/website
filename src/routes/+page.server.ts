import { getFeaturedPosts, type Post } from "$lib/posts";

export const load = async (): Promise<{ posts: Post[] }> => {
  const posts = await getFeaturedPosts();
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
