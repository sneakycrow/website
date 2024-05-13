<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  const artists = data.artists ?? [];
</script>

<svelte:head>
  <title>headphones in</title>
</svelte:head>

{#if artists.length === 0}
  <section class="lg:col-span-6 row-start-2 row-span-2 text-center">
    <p class="text-lg text-gray-500">
      Something wonky going on connecting to Spotify, try again later
    </p>
  </section>
{/if}

{#if artists.length > 0}
  <section class="lg:col-span-6 row-start-2 row-span-2 grid lg:grid-cols-3 gap-10">
    <div class="lg:col-span-3 text-center">
      <h3 class="text-xl uppercase font-bold">Top Artists</h3>
      <p class="text-xs italic text-gray-400">(over approx. last 4 weeks)</p>
    </div>
    {#each artists as artist}
      <div class="space-y-2 flex flex-col items-center justify-center">
        <a href={artist.external_urls.spotify} target="_blank" class="shadow-lg rounded-lg p-4">
          <img
            src={artist?.images[1].url}
            alt={artist?.name}
            width={artist?.images[1].width}
            height={artist?.images[1].height}
            class="object-cover max-h-[300px] max-w-[300px]"
          />
        </a>
        <h3 class="font-bold">{artist?.name}</h3>
      </div>
    {/each}
  </section>
{/if}
