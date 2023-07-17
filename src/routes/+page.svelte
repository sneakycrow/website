<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";
  import AboutMe from "$lib/components/AboutMe.svelte";
  import MOTD from "$lib/components/MOTD.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<main class="grid gap-4 grid-flow-row bg-black p-4 min-h-screen max-w-full">
  <Header subtitle="software wizard" title="Sneaky Crow" />
  <BannerLinks />
  <MOTD content={data.motd.content} source={data.motd.source} />
  <div class="bg-white w-full flex flex-col justify-center items-center lg:p-0 p-4">
    <AboutMe />
  </div>
</main>
