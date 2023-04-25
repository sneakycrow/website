import Head from "next/head";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import React from "react";
import { getGameBySlug, getGames } from "@/components/Game";
import { GetStaticPropsContext } from "next";

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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = (context?.params?.slug ?? "") as string;
  return {
    props: await getGameBySlug(slug),
  };
};

export const getStaticPaths = async () => {
  const games = await getGames();
  const paths = games.map((game) => game.slug);
  return {
    paths,
    fallback: false,
  };
};

export default GamePage;
