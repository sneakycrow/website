import Header from "@/app/Header";
import AboutMe from "@/app/AboutMe";
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
