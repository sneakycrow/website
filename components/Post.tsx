interface PostProps {
  post: BlogPost;
}

export const ShortPost = (props: PostProps) => {
  const { post } = props;
  const date = new Date();
  return (
    <div className="my-4">
      <p className="text-sm font-light italic text-gray-400">
        {date.toLocaleDateString()}
      </p>
      <a
        href={`/blog/${post.slug}`}
        className="text-green-550 text-xl hover:opacity-50 transition-opacity"
      >
        {post.title}
      </a>
    </div>
  );
};

export const LongPost = (props: PostProps) => {
  return (
    <article>
      <h1>{props.post.title}</h1>
    </article>
  );
};

export type BlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
  time: string;
  slug: string;
};

export const getPosts = async (): Promise<BlogPost[]> => {
  return await processLocalPosts();
};

const processLocalPosts = async (): Promise<BlogPost[]> => {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/_posts`, "utf-8");

  return files
    .filter((file: string) => file.endsWith(".md"))
    .map((fn: string) => {
      const path = `${process.cwd()}/_posts/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const slug = fn.split(".md")[0];
      const { data } = matter(rawContent);

      return { ...data, id: uuid(), slug };
    });
};

export const getPostBySlug = async (slug: string): Promise<BlogPost> => {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/_posts`, "utf-8");

  const file = files.find((file: string) => file.startsWith(slug));
  const path = `${process.cwd()}/_posts/${file}`;
  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  const { data, content } = matter(rawContent);

  return { ...data, body: content, id: uuid(), slug };
};

export default LongPost;
