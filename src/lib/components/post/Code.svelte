<script lang="ts">
  import { HighlightAuto } from "svelte-highlight";
  import "svelte-highlight/styles/github-dark.css";

  export let text: string;
</script>

<HighlightAuto class="py-6" code={text} />
