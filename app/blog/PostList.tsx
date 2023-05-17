import { getPosts, ShortPost } from "@/components/Post";
import Title from "@/components/Title";

const PostList = async () => {
  const posts = await getPosts();
  return (
    <div className="flex flex-col w-full bg-white p-6 lg:items-center">
      <Title className="lg:w-3/4 max-w-[1000px]">Posts</Title>
      <div className="lg:w-3/4 max-w-[1000px] divide-y-2">
        {posts.map((post) => (
          <ShortPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
