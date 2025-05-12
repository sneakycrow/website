<script>
  import { onMount } from "svelte";
  import __wbg_init from "$lib/games/bait-and-death/dist/wasm/baitanddeath";

  onMount(async () => {
    await __wbg_init();
  });
</script>

<article class="flex flex-col lg:col-span-6 items-center justify-start space-y-8">
  <h2 class="text-3xl lg:text-4xl font-bold">Bait and Death</h2>
  <canvas id="bad-canvas" class="mx-auto"></canvas>
</article>
