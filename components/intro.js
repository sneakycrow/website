export default function Intro({ subtitle = "engineering"}) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-40 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        sneakycrow
      </h1>
      <h4 className="text-center md:text-left text-4xl md:text-6xl mt-5 md:pl-8">{subtitle}</h4>
    </section>
  );
}
