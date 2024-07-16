<script lang="ts">
  import Code from "./Code.svelte";
  import CodeSpan from "./CodeSpan.svelte";
  import Heading from "./Heading.svelte";
  import List from "./List.svelte";
  import Paragraph from "./Paragraph.svelte";
  import Image from "./Image.svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let source: string;
</script>

<SvelteMarkdown
  renderers={{
    code: Code,
    codespan: CodeSpan,
    paragraph: Paragraph,
    heading: Heading,
    list: List,
    image: Image
  }}
  {source}
/>
