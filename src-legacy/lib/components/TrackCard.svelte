<!-- @migration-task Error while migrating Svelte code: `<a>` is invalid inside `<a>` -->
<script lang="ts">
  import { formatDistanceToNow } from "date-fns";
  type Track = {
    url: string;
    name: string;
    image: string;
    artist_url: string;
    artist_name: string;
    played_at: string;
  };
  interface Props {
    children?: import("svelte").Snippet;
    track: Track;
  }
  let { track }: Props = $props();
</script>

<button
  onclick={() => window.open(track.url, "_blank")}
  class="lg:col-2 space-x-4 flex items-center justify-between shadow-lg rounded p-4 bg-black dark:bg-white text-right mx-auto w-full max-w-[400px]"
>
  <img
    src={track.image}
    alt={track.name}
    width={100}
    height={100}
    class="object-cover max-h-[200px] max-w-[200px]"
  />
  <div class="flex flex-col items-end justify-between">
    <h3 class="font-bold">
      <a href={track.url} target="_blank" class="text-primary-500">
        {track.name}
      </a>
    </h3>
    <a href={track.artist_url} target="_blank" class="text-white dark:text-black font-normal">
      {track.artist_name}
    </a>
    <p class="text-white/50 dark:text-black/50 text-sm font-light">
      {formatDistanceToNow(track.played_at)} ago
    </p>
  </div>
</button>
