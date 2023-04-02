import Hero from "../components/Hero";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="grid grid-cols-2 gap-8 grid-flow-row bg-black p-8">
      <header className="col-span-2 w-full grid grid-flow-row lg:grid-flow-col">
        <Hero />
        <Navigation />
      </header>
    </main>
  );
}
