import fs from "fs";
import matter from "gray-matter";
import { v4 as uuid } from "uuid";
import readingTime from "reading-time";

export type Post = {
  id: string;
  slug: string;
  date: string;
  body: string;
  title: string;
  summary: string;
  featured?: boolean;
  series_key?: string;
  series_pos?: number;
  reading_minutes?: number;
  draft?: boolean;
};

export const getAllPosts = async (): Promise<Post[]> => {
  // Get posts and drafts
  const posts = await processLocalPosts();
  const drafts = await processLocalDrafts();
  // Combine and sort by date
  return sortPostsByDate([...posts, ...drafts]);
};

export const getFeaturedPosts = async (): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  return allPosts.filter((p: Post) => p.featured);
};

export const getSeriesByPost = async (post: Post): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  return allPosts.filter((p: Post) => p.series_key === post.series_key);
};

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const allPosts = await getAllPosts();
  return allPosts.find((p: Post) => p.slug === slug);
};

const processLocalPosts = async (): Promise<Post[]> => {
  return await processLocalMd(`${process.cwd()}/_posts`);
};

const processLocalDrafts = async (): Promise<Post[]> => {
  const drafts = await processLocalMd(`${process.cwd()}/_drafts`);
  // Append the draft flag to each post for upstream filtering
  return drafts.map((p: Post) => ({ ...p, draft: true }));
};

const sortPostsByDate = (posts: Post[]): Post[] => {
  return posts.sort((a: Post, b: Post) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

const processLocalMd = async (path: string): Promise<Post[]> => {
  // Read the directory
  const files = fs.readdirSync(path, "utf-8");
  return (
    files
      // Filter out non-markdown files
      .filter((file: string) => file.endsWith(".md"))
      .map((fn: string) => {
        // Read in the file
        const markdownFile = `${path}/${fn}`;
        const rawContent = fs.readFileSync(markdownFile, {
          encoding: "utf-8"
        });
        // Parse a slug from the filename
        const slug = fn.split(".md")[0];
        // Parse the frontmatter and content
        const { data, content } = matter(rawContent);
        const date = fn.split("-").splice(0, 3).join("-");
        // Generate a reading time estimate
        // This is technically estimating symbols and words together, but it's close enough
        // Round to the nearest minute for readability
        const readingMinutes = Math.round(readingTime(content).minutes);
        return {
          ...data,
          id: uuid(),
          slug,
          date,
          reading_minutes: readingMinutes,
          body: content
        } as Post;
      })
  );
};
