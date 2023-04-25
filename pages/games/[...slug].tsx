import Head from "next/head";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import React from "react";

interface GamePageProps {
  title: string;
  summary: string;
}

const GamePage = (props: GamePageProps) => {
  const { title, summary } = props;

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
        <article>
          <p>Game page</p>
        </article>
        <Footer />
      </main>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
  };
};
