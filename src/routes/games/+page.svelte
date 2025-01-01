<script lang="ts">
  import GameCard from "$lib/components/GameCard.svelte";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  const games = data.games ?? [];
  // Sort games by last played time
  let sortedGames = [...games]
    .filter((game) => game.rtime_last_played > 0)
    .filter((game) => game.playtime_forever >= 300)
    .sort((a, b) => b.rtime_last_played - a.rtime_last_played);
</script>

<svelte:head>
  <title>My Games</title>
</svelte:head>

{#if sortedGames.length > 0}
  {#each sortedGames as game}
    <GameCard
      appId={game.appid}
      name={game.name}
      iconUrl={game.img_icon_url}
      playTime={game.playtime_forever}
    />
  {/each}
{:else}
  <p>No games found.</p>
{/if}
