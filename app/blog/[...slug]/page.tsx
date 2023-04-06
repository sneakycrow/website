import React from "react";
import Hero from "@/components/Hero";
import { getPostBySlug } from "@/components/Post";
import ReactMarkdown from "react-markdown";

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
      <article className="min-h-[75vh] bg-white col-span-2">
        <ReactMarkdown>{data.body}</ReactMarkdown>
      </article>
    </>
  );
};

export default BlogPage;
