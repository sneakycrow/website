import fs from "fs";
import matter from "gray-matter";
import { v4 as uuid } from "uuid";

export const getAllPosts = async (): Promise<any[]> => {
  return await processLocalPosts();
};

export const getPostBySlug = async (slug: string): Promise<any> => {
  const files = fs.readdirSync(`${process.cwd()}/_posts`, "utf-8");

  const file = files.find((file: string) => file.startsWith(slug));
  if (!file) {
    const time = new Date().toISOString();
    return {
      slug: "error",
      body: "<h1>Error rendering post</h1>",
      id: uuid(),
      date: time,
      title: "Error rendering post",
      userId: 1,
      summary: ""
    };
  }
  const path = `${process.cwd()}/_posts/${file}`;
  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8"
  });
  const { data, content } = matter(rawContent);

  return { ...data, body: content, id: uuid(), slug };
};

const processLocalPosts = async (): Promise<any[]> => {
  const files = fs.readdirSync(`${process.cwd()}/_posts`, "utf-8");

  return files
    .filter((file: string) => file.endsWith(".md"))
    .map((fn: string) => {
      const path = `${process.cwd()}/_posts/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8"
      });
      const slug = `/blog/${fn.split(".md")[0]}`;
      const { data } = matter(rawContent);
      const date = fn.split("-").splice(0, 3).join("-");

      return { ...data, id: uuid(), slug, date };
    })
    .reverse();
};
