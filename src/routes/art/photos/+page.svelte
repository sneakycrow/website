<script lang="ts">
  import Thumbnail from "$lib/components/Thumbnail.svelte";

  const photos = [
    {
      source: "/photos/fence_flowers.jpeg",
      thumbnail: "/photos/fence_flowers.jpeg",
      alt: "Flowers behind a fence. Portland, OR",
      date: "November 2020",
      hover: "hover:border-green-500"
    },
    {
      source: "/photos/arsenio.jpeg",
      thumbnail: "/photos/arsenio_thumbnail.jpeg",
      alt: "A dog named Arsenio. Portland, OR",
      date: "November 2020",
      hover: "hover:border-yellow-500"
    },
    {
      source: "/photos/cape_disappointment.jpeg",
      thumbnail: "/photos/cape_disappointment_thumbnail.jpeg",
      alt: "Cape Disappointment. Ilwaco, WA",
      date: "October 2020",
      hover: "hover:border-red-500"
    }
  ];
</script>

<svelte:head>
  <title>writing light</title>
</svelte:head>

<section class="lg:col-span-6 grid lg:grid-cols-2 items-center justify-center gap-20">
  {#each photos as photo}
    <div class="flex flex-col gap-4 justify-center items-center">
      <Thumbnail source={photo.source} alt={photo.alt} hover={photo.hover} />
      <div class="flex flex-col gap-2">
        <p class="text-sm italic text-gray-500 text-center">{photo.alt}</p>
        <p class="text-xs italic text-gray-500 text-center">{photo.date}</p>
      </div>
    </div>
  {/each}
</section>
