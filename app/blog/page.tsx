import React from "react";
import Header from "@/app/Header";
import PostList from "@/app/blog/PostList";
import BannerLinks from "@/components/BannerLinks";

const Blog = () => {
  return (
    <>
      <Header title="self*-awarded" subtitle="award-winning blog" />
      {/* @ts-expect-error Async Server Component */}
      <PostList />
      <BannerLinks />
    </>
  );
};

export default Blog;
