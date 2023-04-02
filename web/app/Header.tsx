import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";

const Header = () => (
  <header className="w-full grid grid-flow-row xl:grid-flow-col lg:col-span-2">
    <Hero />
    <Navigation />
  </header>
);

export default Header;
