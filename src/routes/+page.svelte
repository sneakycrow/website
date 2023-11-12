<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";
  import AboutMe from "$lib/components/AboutMe.svelte";
</script>

<main class="grid gap-4 grid-flow-row p-4 min-h-screen max-w-full">
  <Header subtitle="software wizard" title="Sneaky Crow" />
  <BannerLinks />
  <AboutMe />
</main>
