import React from "react";
import Hero from "@/components/Hero";
import { getPostBySlug } from "@/components/Post";
import Markdown from "@/components/Markdown";

interface BlogPageProps {
  params: {
    slug: string[];
  };
}

const BlogPage = async (props: BlogPageProps) => {
  const data = await getPostBySlug(props.params.slug[0]);
  return (
    <>
      <header className="col-span-2">
        <Hero title={data.title} subtitle="" />
      </header>
      <article className="min-h-[75vh] bg-white col-span-2 p-6 leading-loose flex justify-center">
        <Markdown>{data.body}</Markdown>
      </article>
    </>
  );
};

export default BlogPage;
