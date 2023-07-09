<script>
  import Title from "./Title.svelte";
  import Profile from "./Profile.svelte";
</script>

<div class="p-4 w-full lg:w-3/4 max-w-[1000px]">
  <Title>About Me</Title>
  <Profile />
  <article class="mx-auto space-y-4 mt-10">
    <p class="text-base my-8">
      My name is Zach (aka ctrlsquid), I really enjoy programming. Like a
      lot. Like honestly it&apos;s probably unhealthy, but thats for my
      therapist to solve. I&apos;m a weird guy, but I got a big head
      (that&apos;s not completely full of air) and a big heart, who gives a
      shit about people as much as software. I&apos;m a very versatile
      software developer. I have an unquenchable thirst for knowledge and
      experience, which has equipped me with multitudes of tools and
      experiences.
    </p>
    <h4 class="text-base lg:text-lg font-bold">my 1337 skills</h4>
    <ul class="list-disc list-inside space-y-4 text-xs lg:text-base">
      <li>
        front-end in several different capacities, from static websites to
        full SPA&apos;s, using everything from vanilla js to modern web
        frameworks like React and NextJS to WASM apps built in Rust
      </li>
      <li>
        back-end in several different capacities and protocols, mostly HTTP,
        but some gRPC, Websockets, and RTMP
      </li>
      <li>
        My languages of choice:
        <ul class="list-disc list-inside ml-8">
          <li>Rust (mi amor)</li>
          <li>Typescript (old reliable, kinda?)</li>
          <li>Go (my mistress)</li>
          <li>Python (my ex)</li>
        </ul>
      </li>

      <li>
        near-real time data-streaming, pipelining, and event-driven systems
        using all kinds of Apache software such as Docker, Kubernetes, cloud
        infrastructure, and cumulonimbus.
      </li>
      <li>
        pretty much all web-related AWS services, elastic container service,
        elastic file storage, elastic underwear, and more!
      </li>
      <li>if-else statements that marketers advertised as AI</li>
    </ul>
  </article>
</div>