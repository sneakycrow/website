import Profile from "@/components/Profile";

const AboutMe = () => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold after:w-2 after:bg-green-550 after:h-full after:absolute relative after:-skew-x-12 after:ml-2">
        About me
      </h3>
      <Profile />
      <article className="mx-auto max-w-[800px] space-y-8 mt-16">
        <p className="text-base">
          My name is Zach (aka ctrlsquid), I really enjoy programming. Like a
          lot. Like honestly it&apos;s probably unhealthy, but thats for my
          therapist to solve. I&apos;m a weird guy, but I got a big head
          (that&apos;s not completely full of air) and a big heart, who gives a
          shit about people as much as software. I&apos;m a very versatile
          software developer. I have an unquenchable thirst for knowledge and
          experience, which has equipped me with multitudes of tools and
          experiences.
        </p>
        <h4 className="text-xl font-bold">my 1337 skills</h4>
        <ul className="list-disc list-inside text-base space-y-4">
          <li>
            front-end in several different capacities, from static websites to
            full SPA&apos;s
          </li>
          <li>I know React quite well, and I am also a big fan of Vue.</li>
          <li>
            back-end in several different capacities and protocols, mostly HTTP,
            but some gRPC, Websockets, and WASM as well
          </li>
          <li>
            My languages of choice:
            <ul className="list-disc list-inside ml-8">
              <li>Rust (mi amor)</li>
              <li>Go (my mistress)</li>
              <li>Typescript (old reliable, kinda?)</li>
            </ul>
          </li>

          <li>
            near-real time data-streaming, pipelining, and event-driven systems
            using all kinds of Apache software, Docker, k8s, cloud
            infrastructure, cumulonimbus.
          </li>
          <li>
            pretty much all web-related AWS services, elastic container service,
            elastic file storage, elastic underwear, etc...
          </li>
          <li>if-else statements that marketers advertised as AI</li>
        </ul>
      </article>
    </div>
  );
};

export default AboutMe;
