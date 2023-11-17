import { getFeaturedPosts, type Post } from "$lib/posts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  try {
    const session = await locals.auth.validate();

    const posts = await getFeaturedPosts();
    const postsWithPrefix: Post[] = posts.map((p) => {
      return {
        ...p,
        slug: `/blog/${p.slug}`
      };
    });
    if (!session) return { posts: postsWithPrefix };
    return {
      posts: postsWithPrefix,
      username: session.username
    };
  } catch (e) {
    console.error(`Could not load page on server ${e}`);
    return { posts: [] };
  }
};
