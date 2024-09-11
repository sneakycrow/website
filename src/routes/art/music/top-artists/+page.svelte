<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  const artists = data.artists ?? [];
</script>

<svelte:head>
  <title>headphones in</title>
</svelte:head>

{#if artists.length > 0}
  {#each artists as artist}
    <div class="space-y-2 flex flex-col items-center justify-center">
      <a
        href={artist.external_urls.spotify}
        target="_blank"
        class="shadow-lg rounded-lg p-4 bg-black"
      >
        <img
          src={artist?.images[1].url}
          alt={artist?.name}
          width={artist?.images[1].width}
          height={artist?.images[1].height}
          class="object-cover max-h-[300px] max-w-[300px]"
        />
        <h3 class="font-bold text-xl text-primary-500 text-center mt-4">{artist?.name}</h3>
      </a>
    </div>
  {/each}
{/if}
