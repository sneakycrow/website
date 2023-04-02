interface PostProps {
  short?: boolean;
  post: BlogPost;
}

export const ShortPost = (props: PostProps) => {
  return (
    <div className="my-4">
      <h1>{props.post.title}</h1>
    </div>
  );
};

export const LongPost = (props: PostProps) => {
  return (
    <div>
      <h1>{props.post.title}</h1>
    </div>
  );
};

export type BlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export const getPosts = async (): Promise<BlogPost[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await res.json();
};

export default LongPost;
