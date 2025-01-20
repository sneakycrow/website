<script lang="ts">
  import Profile from "./Profile.svelte";
  interface Props {
    [key: string]: any;
  }

  let { ...rest }: Props = $props();

  const hobbies = [
    {
      copy: "listening to my favorite music",
      url: "/music",
      class: "font-normal text-black dark:text-white underline decoration-4 decoration-purple-500"
    },
    {
      copy: "grinding some video games",
      url: "/projects",
      class: "font-normal text-black dark:text-white underline decoration-4 decoration-blue-500"
    },
    {
      copy: "reading with my book club",
      url: "/books",
      class: "font-normal text-black dark:text-white underline decoration-4 decoration-orange-500"
    },
    {
      copy: "taking some photos of the PNW",
      url: "/art/photos",
      class: "font-normal text-black dark:text-white underline decoration-4 decoration-red-500"
    }
  ];
</script>

<article class={`w-full flex flex-col space-y-10 lg:text-lg ${rest.class}`} id="about">
  <Profile />
  <p>
    My name is Zachary Corvidae, also known as sneaky crow. With over two decades of experience,
    I've designed, developed, and scaled applications of many sizes. Throughout my career, I've had
    the privilege of contributing to a diverse array of projects and companies, ranging from
    <strong>industry giants</strong> to <strong>boutique agencies</strong>, and even
    <strong>venturing into entrepreneurship</strong> by founding multiple successful software projects
    and businesses.
  </p>
  <p>
    Beyond the realm of programming, I also like to incorporate some of my other favorite hobbies
    and interests in what I do. I'm always seeking to feed the little rat inside my brain more food,
    and I do that by
    {#each hobbies as hobby, i}
      {#if i === hobbies.length - 1}and
      {/if}
      <a href={hobby.url} class={hobby.class}>{hobby.copy}</a
      >{#if i !== hobbies.length - 1}{`, `}{:else}{`.`}{/if}
    {/each}
  </p>
  <p>
    I <span class="italic">love</span> to collaborate. Feel free to reach out to me via
    <a
      class="font-normal text-black dark:text-white underline decoration-4 decoration-primary-500"
      href="mailto:zach@sneakycrow.dev">email</a
    >.
  </p>
</article>
