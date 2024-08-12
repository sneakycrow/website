<script lang="ts">
  import type { PageServerData } from "./$types";
  import { formatDistanceToNow } from "date-fns";

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
    <a
      href={track.track.external_urls.spotify}
      target="_blank"
      class="lg:col-2 space-x-4 flex items-center justify-between shadow-lg rounded-lg p-4 text-right mx-auto w-full max-w-[400px]"
    >
      <img
        src={track.track.album?.images[0].url}
        alt={track.track.name}
        width={100}
        height={100}
        class="object-cover max-h-[200px] max-w-[200px]"
      />
      <div class="flex flex-col items-end justify-between">
        <h3 class="font-bold">
          <a href={track.track.external_urls.spotify} target="_blank" class="text-gray-900">
            {track.track.name}
          </a>
        </h3>
        <a
          href={track.track.artists[0].external_urls.spotify}
          target="_blank"
          class="text-gray-500 font-normal"
        >
          {track.track.artists[0].name}
        </a>
        <p class="text-gray-300 text-sm font-light">{formatDistanceToNow(track.played_at)} ago</p>
      </div>
    </a>
  {/each}
{/if}
