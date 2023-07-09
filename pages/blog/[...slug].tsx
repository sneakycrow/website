import React from "react";
import Hero from "@/components/Hero";
import { BlogPost, getPostBySlug, getPosts } from "@/components/Post";
import Article from "@/components/Article";
import "@/app/globals.css";
import Head from "next/head";
import BannerLinks from "@/components/BannerLinks";
import { GetStaticPropsContext } from "next";

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
      <main className="flex flex-col gap-4 bg-black p-4">
        <header>
          <Hero title={title} subtitle="" homeURL="/blog" />
        </header>
        <Article>{body}</Article>
        <BannerLinks />
      </main>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = (context?.params?.slug ?? "") as string;
  return {
    props: await getPostBySlug(slug),
  };
};

export const getStaticPaths = async () => {
  const posts = await getPosts();
  const paths = posts.map((post) => post.slug);

  return {
    paths: paths,
    fallback: false,
  };
};

export default BlogPage;
