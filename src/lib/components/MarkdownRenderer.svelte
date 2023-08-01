<script lang="ts">
  import Code from "./post/Code.svelte";
  import CodeSpan from "$lib/components/post/CodeSpan.svelte";
  import Heading from "./post/Heading.svelte";
  import List from "./post/List.svelte";
  import Paragraph from "./post/Paragraph.svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let source: string;
</script>

<SvelteMarkdown
  renderers={{
        code: Code,
        codespan: CodeSpan,
        paragraph: Paragraph,
        heading: Heading,
        list: List
      }}
  source={source}
/>