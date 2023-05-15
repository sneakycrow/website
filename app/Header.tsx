import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header = (props: HeaderProps) => (
  <header className="xl:max-h-[50vh] w-full grid grid-flow-row xl:grid-flow-col">
    <Hero title={props.title} subtitle={props.subtitle} />
    <Navigation />
  </header>
);

export default Header;
