import Header from "@/app/Header";
import AboutMe from "@/app/AboutMe";
import React from "react";
import Footer from "@/components/Footer";

const Home = async () => {
  return (
    <main className="grid gap-4 grid-flow-row bg-black p-4 min-h-screen max-w-full">
      <Header />
      <div className="bg-white w-full">
        <AboutMe />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
