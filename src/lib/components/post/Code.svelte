<script>
  import "svelte-highlight/styles/dracula";
  import { HighlightAuto } from "svelte-highlight";
  import "svelte-highlight/styles/github-dark.css";

  export let text;
</script>

<HighlightAuto class="py-6" code={text} />
