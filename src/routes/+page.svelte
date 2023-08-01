<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";
  import AboutMe from "$lib/components/AboutMe.svelte";
  import MOTD from "$lib/components/MOTD.svelte";
  import type { PageServerData } from "./$types";
  import Title from "$lib/components/Title.svelte";

  import { onMount } from "svelte";
  import { fade } from "svelte/transition";


  let ready = false;
  export let data: PageServerData;
  onMount(() => {
    ready = true;
  });
</script>

<main class="grid gap-4 grid-flow-row bg-black p-4 min-h-screen max-w-full">
  <Header subtitle="software wizard" title="Sneaky Crow" />
  <BannerLinks />
  <div class="flex divide-x-[16px] divide-black bg-white">
    <div class="w-1/2">
      <MOTD content={data.motd.content} image={data.motd.image} source={data.motd.url} />
    </div>
    <div class="w-1/2 p-4 flex flex-col h-full justify-between" in:fade={{ delay: 250, duration: 300 }}>
      {#if ready}
        <Title size="sm">Featured Post</Title>
        <div class="self-center text-lg">
          <a href={`/blog/${data.featuredPost.slug}`}>{data.featuredPost.title}</a>
        </div>
      {/if}
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
