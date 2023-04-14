import React from "react";
import Hero from "@/components/Hero";
import { BlogPost, getPostBySlug, getPosts } from "@/components/Post";
import Article from "@/components/Article";
import "@/app/globals.css";
import Head from "next/head";
import Footer from "@/components/Footer";

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
          content="https://sneakycrow.dev/logo_v2.svg"
        />
      </Head>
      <main className="grid gap-4 grid-flow-row bg-black auto-rows-min p-4 min-h-screen">
        <header className="row-start-1">
          <Hero title={title} subtitle="" />
        </header>
        <Article>{body}</Article>
        <Footer />
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
