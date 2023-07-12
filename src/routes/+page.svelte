<script lang="ts">
  import Header from "../components/Header.svelte";
  import BannerLinks from "../components/BannerLinks.svelte";
  import AboutMe from "../components/AboutMe.svelte";
</script>

<main class="grid gap-4 grid-flow-row bg-black p-4 min-h-screen max-w-full">
  <Header subtitle="software wizard" title="Sneaky Crow" />
  <BannerLinks />

  <div class="bg-white w-full flex flex-col justify-center items-center">
    <AboutMe />
  </div>
</main>
