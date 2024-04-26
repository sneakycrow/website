<script lang="ts">
  import { HighlightAuto } from "svelte-highlight";
  import "svelte-highlight/styles/github-dark.css";

  export let text: string;
</script>

<HighlightAuto class="my-4" code={text} />
