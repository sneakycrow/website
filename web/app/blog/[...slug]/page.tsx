import React from "react";
import Hero from "@/components/Hero";

interface BlogPageProps {
  params: {
    slug: string[];
  };
}

const BlogPage = (props: BlogPageProps) => {
  return (
    <>
      <header className="col-span-2">
        <Hero title={props.params.slug.join("-")} subtitle="" />
      </header>
      <article className="min-h-[75vh] bg-white col-span-2"></article>
    </>
  );
};

export default BlogPage;
