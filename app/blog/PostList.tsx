import { getPosts, ShortPost } from "@/components/Post";

const PostList = async () => {
  const posts = await getPosts();
  return (
    <div className="flex flex-col w-full bg-white p-6 lg:items-center">
      <h3 className="text-xl lg:w-3/4 mb-4 font-bold after:w-2 after:bg-green-550 after:h-full after:absolute relative after:-skew-x-12 after:ml-2">
        Posts
      </h3>
      <div className="lg:w-3/4 divide-y-2">
        {posts.map((post) => (
          <ShortPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
