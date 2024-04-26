<script lang="ts">
  import Art from "$lib/components/Art.svelte";
  import BannerLinks from "$lib/components/ExtraLinks.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <title>art</title>
</svelte:head>

<main class="grid gap-4 grid-flow-row bg-black p-4 min-h-screen">
  <Header title="games & art by zach" />
  <BannerLinks />
  <Art />
</main>
