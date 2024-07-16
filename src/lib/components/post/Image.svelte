<script lang="ts">
  export let href: string;
  export let text: string;

  // If the href ends in with a video extension, we'll render a video tag
  const isVideo = href.endsWith(".mp4") || href.endsWith(".webm");
</script>

<div class="w-full flex flex-col items-center justify-center space-y-4 py-4">
  {#if isVideo}
    <video controls class="shadow-flat-green max-w-[720px] w-full">
      <track kind="captions" />
      <source src={href} type={`video/${href.split(".").pop()}`} />
    </video>
    <p class="text-sm italic">{text}</p>
  {:else}
    <img src={href} alt={text} />
    <p class="text-sm italic">{text}</p>
  {/if}
</div>
