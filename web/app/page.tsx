import Header from "@/app/Header";
import AboutMe from "@/app/AboutMe";

const Home = async () => {
  return (
    <main className="grid lg:grid-cols-2 grid-cols-1 gap-4 grid-flow-row bg-black p-4 min-h-screen">
      <Header />
      <div className="bg-white w-full">
        <p>testing</p>
      </div>
      <div className="bg-white">
        <AboutMe />
      </div>
      <div className="bg-white">this is the project section</div>
    </main>
  );
};

export default Home;
