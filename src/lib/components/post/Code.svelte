<script lang="ts">
  import { HighlightAuto } from "svelte-highlight";
  import "svelte-highlight/styles/dracula.css";

  export let text: string;
</script>

<div class="py-10">
  <HighlightAuto class="shadow-flat-green" code={text} />
</div>
