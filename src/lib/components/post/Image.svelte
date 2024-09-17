<script lang="ts">
  import Play from "../icons/Play.svelte";

  export let href: string;
  export let text: string;

  // If the href ends in with a video extension, we'll render a video tag
  const isVideo = href.endsWith(".mp4") || href.endsWith(".webm");
</script>

<div class="w-full flex flex-col items-center justify-center space-y-4 relative">
  {#if isVideo}
    <video controls class="shadow-flat-green max-w-[720px] w-full z-10">
      <track kind="captions" />
      <source src={href} type={`video/${href.split(".").pop()}`} />
    </video>
    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Play width="4em" height="4em" />
    </div>
    <p class="text-sm italic">{text}</p>
  {:else}
    <img src={href} alt={text} class="shadow-flat-green" />
    <p class="text-sm italic">{text}</p>
  {/if}
</div>
