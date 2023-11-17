<script>
  import Title from "./Title.svelte";
  import Profile from "./Profile.svelte";
  import Tag from "$lib/components/Tag.svelte";

  const skills = [
    "Rust",
    "Go",
    "TypeScript",
    "React",
    "Svelte",
    "gRPC",
    "Kubernetes",
    "Docker",
    "AWS",
    "Terraform",
    "PostgreSQL",
    "Redis"
  ];
</script>

<div class="py-4 w-full bg-white" id="about">
  <article class="lg:w-3/4 p-4 max-w-[1000px] mx-auto space-4">
    <Title>Who am I?!</Title>
    <Profile />
    <p class="text-base my-8">
      My name is Zach, (aka sneaky crow). I've been programming for over 20 years, and I've been working
      professionally
      as a software engineer for over 10 years. I've worked on a wide variety of projects, from small startups to
      large
      enterprises, and I've worked on everything from embedded systems to web applications to cloud infrastructure.
    </p>
    <h4 class="text-base lg:text-lg font-bold">my 1337 skills</h4>
    <ul class="list-disc list-inside space-y-4 text-base">
      <li>
        client application development including web and native
      </li>
      <li>
        server application networking including http and grpc
      </li>
      <li>
        cloud infrastructure and technical architecture, including k8s and other docker-based systems
      </li>
      <li>
        data streaming, queueing, processing, and general data engineering
      </li>
    </ul>
  </article>
  <aside class="flex flex-wrap items-center justify-center mt-10 max-w-[800px] mx-auto">
    {#each skills as skill}
      <Tag>{skill}</Tag>
    {/each}
  </aside>
</div>
