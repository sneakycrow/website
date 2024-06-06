<script lang="ts">
  import { HighlightAuto } from "svelte-highlight";
  import "svelte-highlight/styles/github-dark.css";

  export let text: string;
</script>

<div class="py-10">
  <HighlightAuto class="shadow-flat-green" code={text} />
</div>
