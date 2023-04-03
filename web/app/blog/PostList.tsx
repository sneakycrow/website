import { getPosts, ShortPost } from "@/components/Post";

const PostList = async () => {
  const posts = await getPosts();
  return (
    <div className="flex flex-col w-full bg-white p-6 col-span-2">
      <div className="w-2/3 mx-auto">
        {posts.map((post) => (
          <ShortPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
