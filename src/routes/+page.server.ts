import { getAllPosts, type Post } from "$lib/posts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  try {
    const session = await locals.auth.validate();

    const posts = await getAllPosts();
    // Trim to 3 most recent posts
    const trimmedPosts = posts.slice(0, 3);
    const postsWithPrefix: Post[] = trimmedPosts.map((p) => {
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
