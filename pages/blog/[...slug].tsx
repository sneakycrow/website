import React from "react";
import Hero from "@/components/Hero";
import { BlogPost, getPostBySlug, getPosts } from "@/components/Post";
import Markdown from "@/components/Markdown";

const BlogPage = (props: BlogPost) => {
  const { title, body } = props;
  return (
    <>
      <header className="col-span-2">
        <Hero title={title} subtitle="" />
      </header>
      <article className="min-h-[75vh] bg-white col-span-2 p-6 leading-loose flex justify-center">
        <Markdown>{body}</Markdown>
      </article>
    </>
  );
};

// @ts-ignore
export async function getStaticProps(context) {
  return {
    props: await getPostBySlug(context.params.slug),
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((post) => post.slug);

  return {
    paths: paths,
    fallback: false,
  };
}

export default BlogPage;
