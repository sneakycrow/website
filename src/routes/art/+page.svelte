<script lang="ts">
  import Art from "$lib/components/Art.svelte";
  import BannerLinks from "$lib/components/ExtraLinks.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<main class="grid gap-4 grid-flow-row bg-black p-4 min-h-screen">
  <Header subtitle="games & art by zach" title="play catch" />
  <BannerLinks />
  <Art />
</main>
