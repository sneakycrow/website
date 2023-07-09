import React from "react";
import Header from "@/_next_pages/Header";
import PostList from "@/_next_pages/blog/PostList";
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
