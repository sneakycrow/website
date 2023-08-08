<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";
  import AboutMe from "$lib/components/AboutMe.svelte";
  import MOTD from "$lib/components/MOTD.svelte";
  import type { PageServerData } from "./$types";
  import Title from "$lib/components/Title.svelte";


  export let data: PageServerData;
</script>

<main class="grid gap-4 grid-flow-row bg-black p-4 min-h-screen max-w-full">
  <Header subtitle="software wizard" title="Sneaky Crow" />
  <BannerLinks />
  <div class="w-full gap-4 grid grid-flow-row lg:grid-cols-2">
    <div>
      <MOTD content={data.motd.content} image={data.motd.image} source={data.motd.url} />
    </div>
    <div class="p-4 flex flex-col h-full justify-between bg-white">
      <Title size="sm">Featured Post</Title>
      <div class="self-center text-lg">
        <a href={`/blog/${data.featuredPost.slug}`}>{data.featuredPost.title}</a>
      </div>
      <p
        class="text-xs text-gray-400 italic self-end hover:cursor-pointer flex items-center justify-center">
        {data.featuredPost.date}
      </p>
    </div>
  </div>
  <div class="bg-white w-full flex flex-col justify-center items-center lg:p-0 p-4">
    <AboutMe />
  </div>
</main>
