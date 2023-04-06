import Header from "@/app/Header";
import AboutMe from "@/app/AboutMe";
import React from "react";

const Home = async () => {
  return (
    <main className="grid gap-4 grid-flow-row bg-black p-4 min-h-screen">
      <Header />
      <div className="bg-white w-full">
        <AboutMe />
      </div>
    </main>
  );
};

export default Home;
