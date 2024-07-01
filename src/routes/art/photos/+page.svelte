<script lang="ts">
  import FilmPhoto from "$lib/components/FilmPhoto.svelte";
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
    <FilmPhoto {photo} />
  {/each}
</section>
