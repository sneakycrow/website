interface PostProps {
  post: BlogPost;
}

export const ShortPost = (props: PostProps) => {
  const { post } = props;
  const date = new Date(post.date);
  return (
    <div className="py-4">
      <p className="text-sm font-light italic text-gray-400">
        {date.toLocaleDateString()}
      </p>
      <a
        href={post.slug}
        className="text-green-550 text-xl hover:opacity-50 transition-opacity"
      >
        {post.title}
      </a>
      <p className="text-sm italic text-gray-400 mt-4">{post.summary}</p>
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
  date: string;
  slug: string;
  summary: string;
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
      const slug = `/blog/${fn.split(".md")[0]}`;
      const { data } = matter(rawContent);
      const date = fn.split("-").splice(0, 3).join("-");

      return { ...data, id: uuid(), slug, date };
    })
    .reverse();
};

export const getPostBySlug = async (slug: string): Promise<BlogPost> => {
  const { v4: uuid } = require("uuid");

  const fs = require("fs");
  const matter = require("gray-matter");

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
      summary: "",
    };
  }
  const path = `${process.cwd()}/_posts/${file}`;
  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  const { data, content } = matter(rawContent);

  return { ...data, body: content, id: uuid(), slug };
};

export default LongPost;
