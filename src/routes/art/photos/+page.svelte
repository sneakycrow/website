<script lang="ts">
  import FilmPhoto from "$lib/components/FilmPhoto.svelte";
  import photos from "$lib/photos";
</script>

<svelte:head>
  <title>writing light</title>
</svelte:head>

<section class="grid lg:grid-cols-6 grid-flow-row-dense items-center justify-center gap-20 p-4">
  {#each photos as photo, index}
    <FilmPhoto
      {photo}
      class={`w-full mx-auto lg:col-span-3 hover:rotate-0 transition-transform ${
        (index + 1) % 2 === 0 ? "-rotate-3" : "rotate-3"
      }`}
    />
  {/each}
</section>
