<script lang="ts">
  import TrackCard from "$lib/components/TrackCard.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  const tracks = data.tracks ?? [];
</script>

<svelte:head>
  <title>headphones in</title>
</svelte:head>

{#if tracks.length === 0}
  <p class="text-error-500 font-semibold text-3xl text-center lg:col-span-3">
    Uh oh, I failed to load my recent tunes. Lame. Sorry about that. Try again later
  </p>
{/if}
{#if tracks.length > 0}
  {#each tracks as track}
    <TrackCard
      track={{
        url: track.track.external_urls.spotify,
        image: track.track.album?.images[0].url,
        name: track.track.name,
        artist_url: track.track.artists[0].external_urls.spotify,
        artist_name: track.track.artists[0].name,
        played_at: track.played_at
      }}
    />
  {/each}
{/if}
