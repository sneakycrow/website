<script lang="ts">
  import FilmPhoto from "$lib/components/FilmPhoto.svelte";

  const photos = [
    {
      source: "/photos/start_family.jpeg",
      alt: "Beginning of my family. Portland, OR",
      date: "June 2017"
    },
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
      date: "February 2020"
    }
  ];
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
