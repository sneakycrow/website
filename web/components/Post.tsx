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
        href={post.url}
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
  url: string;
};

export const getPosts = async (): Promise<BlogPost[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const rawData: BlogPost[] = await res.json();
  return rawData.map((p) => {
    const time = new Date().toLocaleDateString();
    const url = `/blog/${p.title.split(" ").join("-")}`;
    return { ...p, time, url };
  });
};

export const getPostByID = async (id: number): Promise<BlogPost> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?id=${id}`
  );
  return await res.json();
};

export default LongPost;
