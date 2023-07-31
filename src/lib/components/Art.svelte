<script lang="ts">
  import { onMount } from "svelte";
  import __wbg_init from "../../assets/art/art";

  onMount(async () => {
    await __wbg_init();
  });
</script>

<article class="bg-white flex justify-center items-center p-4">
  <canvas id="art_canvas" />
</article>