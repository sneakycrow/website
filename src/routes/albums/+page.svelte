<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  const albums = data.albums ?? [];
</script>

{#if data?.error}
  <div class="lg:col-span-6 row-start-2 row-span-2 text-center text-lg text-red-500 font-semibold">
    <p>{data.error.message}</p>
  </div>
{/if}

<section class="lg:col-span-6 row-start-2 row-span-2 grid lg:grid-cols-3 gap-10">
  <p class="lg:col-span-3 text-center text-lg font-semibold">
    All the albums I remembered to save on Spotify
  </p>
  {#each albums as albumData}
    <div class="space-y-2 flex flex-col items-center justify-center">
      <a
        href={albumData.album.external_urls.spotify}
        target="_blank"
        class="shadow-lg rounded-lg p-4"
      >
        <img
          src={albumData.album.images[1].url}
          alt={albumData.album.name}
          width={albumData.album.images[1].width}
          height={albumData.album.images[1].height}
        />
      </a>
      <h3 class="font-bold">{albumData.album.name}</h3>
      <p class="text-sm">{albumData.album.artists[0].name}</p>
    </div>
  {/each}
</section>
