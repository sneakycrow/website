import { getPosts, ShortPost } from "@/components/Post";

const PostList = async () => {
  const posts = await getPosts();
  return (
    <div className="flex flex-col w-full bg-white">
      {posts.map((post) => (
        <ShortPost key={post.id} short post={post} />
      ))}
    </div>
  );
};

export default PostList;
