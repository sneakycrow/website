<script lang="ts">
  import Hero from "./Hero.svelte";
  import Navigation from "./Navigation.svelte";

  export let title: string;
  export let subtitle: string;
</script>

<header class="w-full bg-white flex justify-center">
  <div
    class="xl:max-h-[50vh] w-full flex justify-between max-w-[1000px]">
    <Hero {subtitle} {title} />
    <Navigation />
  </div>
</header>
