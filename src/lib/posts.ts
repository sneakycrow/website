import fs from "fs";
import matter from "gray-matter";
import { v4 as uuid } from "uuid";

export type Post = {
  id: string;
  slug: string;
  date: string;
  body: string;
  title: string;
  summary: string;
  series_key?: string;
  series_pos?: number;
};
type Series = {};

export const getAllPosts = async (): Promise<Post[]> => {
  return await processLocalPosts();
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
  const files = fs.readdirSync(`${process.cwd()}/_posts`, "utf-8");

  return files
    .filter((file: string) => file.endsWith(".md"))
    .map((fn: string) => {
      const path = `${process.cwd()}/_posts/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8"
      });
      const slug = fn.split(".md")[0];
      const { data, content } = matter(rawContent);
      const date = fn.split("-").splice(0, 3).join("-");

      return { ...data, id: uuid(), slug, date, body: content } as Post;
    })
    .reverse();
};
