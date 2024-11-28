<script lang="ts">
  import ArtistCard from "$lib/components/ArtistCard.svelte";
  import type { PageServerData } from "./$types";

  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();
  const artists = data.artists ?? [];
</script>

<svelte:head>
  <title>headphones in</title>
</svelte:head>

{#if artists.length > 0}
  {#each artists as artist}
    <ArtistCard
      url={artist.external_urls.spotify}
      image={artist?.images[1].url}
      name={artist?.name}
      width={artist?.images[1].width}
      height={artist?.images[1].height}
    />
  {/each}
{/if}
