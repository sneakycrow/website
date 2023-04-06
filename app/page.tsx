import Header from "@/app/Header";
import AboutMe from "@/app/AboutMe";
import React from "react";
import MOTD from "@/components/MOTD";

const Home = async () => {
  return (
    <main className="grid lg:grid-cols-2 grid-cols-1 gap-4 grid-flow-row bg-black p-4 min-h-screen">
      <Header />
      <div className="bg-white w-full">
        <MOTD
          message="To be able to understand an idea without accepting it is the mark of an educated mind"
          author="Aristotle"
        />
      </div>
      <div className="bg-white">
        <AboutMe />
      </div>
      <div className="bg-white">this is the project section</div>
    </main>
  );
};

export default Home;
