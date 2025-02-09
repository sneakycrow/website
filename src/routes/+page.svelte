<script lang="ts">
  import Collections from "$lib/components/Collections.svelte";
  import Socials from "$lib/components/Socials.svelte";

  const creatorProjects = [
    {
      name: "Cobrashare",
      link: "https://cobrashare.net",
      description:
        "A file-sharing platform for 3D artists to distribute files to their Patreon supporters"
    },
    {
      name: "Farmhand",
      link: "https://github.com/witchscrow/farmhand",
      description:
        "An open-source tool that helps livestreamers analyze and boost viewer engagement"
    }
  ];
</script>

<svelte:head>
  <title>sneaky crow</title>
</svelte:head>

<section
  class="col-start-1 lg:col-span-6 min-h-[40vh] max-w-[1000px] mx-auto space-y-8 text-center flex flex-col justify-center items-center"
>
  <img
    src="/ada_cropped.png"
    alt="Ada the crow, the mascot of Sneaky Crow"
    style="animation: bounce 3s infinite;"
    width={300}
  />
  <Socials showCopy={true} />
  <p class="text-xl">
    Hey there, I'm Zach. I'm a human being of many titles, and I'm definitely <span
      class="font-bold underline italic uppercase">not</span
    > a crow in a long-coat pretending to be a human.
  </p>
  <p class="text-lg">
    Currently, I'm living in Portland, OR and working as a Senior Software Engineer at <a
      href="https://www.laika.com/"
      target="_blank">a Puppet Factory</a
    > in addition to building custom projects for creators such as:
  </p>
  <ul class="flex justify-between items-start">
    {#each creatorProjects as project (project.name)}
      <li class="w-1/2 my-6 space-y-4 flex flex-col items-center text-center">
        <span class="font-bold text-xl text-secondary-700 dark:text-secondary-100 uppercase"
          ><a href={project.link} target="_blank">{project.name}</a></span
        >
        <span class="text-lg text-secondary-700 dark:text-secondary-300">{project.description}</span
        >
      </li>
    {/each}
  </ul>
</section>
<Collections class="lg:col-span-6 my-20" />
