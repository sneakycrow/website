<script lang="ts">
  import Hero from "./Hero.svelte";
  import Navigation from "./Navigation.svelte";

  export let title: string;
  export let subtitle: string;
</script>

<header class="xl:max-h-[50vh] w-full grid grid-flow-row xl:grid-flow-col">
  <Hero {subtitle} {title} />
  <Navigation />
</header>
