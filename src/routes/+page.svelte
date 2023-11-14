<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";
  import AboutMe from "$lib/components/AboutMe.svelte";

  export let user: { username: string; avatar: string; } | undefined;
</script>

<main class="flex flex-col space-y-4 p-4 min-h-screen max-w-full">
  <Header subtitle="software wizard" title="Sneaky Crow" />
  <BannerLinks />
  <AboutMe />
</main>
