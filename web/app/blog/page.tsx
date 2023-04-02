import React from "react";
import Header from "@/app/Header";
import PostList from "@/app/blog/PostList";

const Blog = () => {
  return (
    <>
      <Header />
      {/* @ts-expect-error Async Server Component */}
      <PostList />
    </>
  );
};

export default Blog;
