<script lang="ts">
  import Thumbnail from "$lib/components/Thumbnail.svelte";

  const photos = [
    {
      source: "/photos/timothy_lake.jpeg",
      alt: "Timothy Lake. Mt. Hood National Forest, OR",
      date: "June 2018"
    },
    {
      source: "/photos/portland_new_years_2019.jpeg",
      alt: "Portland New Years 2019. Portland, OR",
      date: "January 2019"
    },
    {
      source: "/photos/fence_flowers.jpeg",
      alt: "Flowers behind a fence. Portland, OR",
      date: "November 2020"
    },
    {
      source: "/photos/arsenio.jpeg",
      alt: "A dog named Arsenio. Portland, OR",
      date: "November 2020"
    },
    {
      source: "/photos/cape_disappointment.jpeg",
      thumbnail: "/photos/cape_disappointment_thumbnail.jpeg",
      alt: "Cape Disappointment. Ilwaco, WA",
      date: "October 2020"
    }
  ];
</script>

<svelte:head>
  <title>writing light</title>
</svelte:head>

<section class="lg:col-span-6 grid lg:grid-cols-2 items-center justify-center gap-20">
  {#each photos as photo}
    <div class="flex flex-col gap-4 justify-center items-center">
      <Thumbnail source={photo.source} alt={photo.alt} />
      <div class="flex flex-col gap-2">
        <p class="text-sm italic text-gray-500 text-center">{photo.alt}</p>
        <p class="text-xs italic text-gray-500 text-center">{photo.date}</p>
      </div>
    </div>
  {/each}
</section>
