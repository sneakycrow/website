import Hero from "../components/Hero";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="grid grid-cols-2 gap-8 grid-flow-row bg-black p-8">
      <header className="col-span-2 flex w-full">
        <Hero />
        <Navigation />
      </header>
    </main>
  );
}
