import Header from "@/_next_pages/Header";
import AboutMe from "@/_next_pages/AboutMe";
import React from "react";
import BannerLinks from "@/components/BannerLinks";

const Home = async () => {
  return (
    <main className="grid gap-4 grid-flow-row bg-black p-4 min-h-screen max-w-full">
      <Header />
      <BannerLinks />

      <div className="bg-white w-full flex flex-col justify-center items-center">
        <AboutMe />
      </div>
    </main>
  );
};

export default Home;
