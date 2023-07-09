<script lang="ts">
  import Hero from "./Hero.svelte";
  import Navigation from "./Navigation.svelte";

  export let title: string;
  export let subtitle: string;
  export let image: string;

</script>

<header class="xl:max-h-[50vh] w-full grid grid-flow-row xl:grid-flow-col">
  <Hero imageURL={image} subtitle={subtitle} title={title} />
  <Navigation />
</header>