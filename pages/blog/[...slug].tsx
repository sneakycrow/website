import React from "react";
import Hero from "@/components/Hero";
import { BlogPost, getPostBySlug, getPosts } from "@/components/Post";
import Markdown from "@/components/Markdown";
import "@/app/globals.css";
import Head from "next/head";

const BlogPage = (props: BlogPost) => {
  const { title, body, summary } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta
          property="og:image"
          content="https://sneakycrow.dev/logo_v2.png"
        />
      </Head>
      <main className="grid gap-4 grid-flow-row bg-black p-4 min-h-screen">
        <header className="col-span-2">
          <Hero title={title} subtitle="" />
        </header>
        <article className="min-h-[75vh] bg-white col-span-2 p-6 flex justify-center">
          <Markdown>{body}</Markdown>
        </article>
      </main>
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
