<script lang="ts">
  import Code from "./Code.svelte";
  import CodeSpan from "./CodeSpan.svelte";
  import Heading from "./Heading.svelte";
  import List from "./List.svelte";
  import Paragraph from "./Paragraph.svelte";
  import Image from "./Image.svelte";
  import Link from "./Link.svelte";
  import HorizontalRule from "./HorizontalRule.svelte";
  import SvelteMarkdown from "svelte-markdown";

  interface Props {
    source: string;
  }

  let { source }: Props = $props();
</script>

<SvelteMarkdown
  renderers={{
    code: Code,
    codespan: CodeSpan,
    paragraph: Paragraph,
    heading: Heading,
    list: List,
    image: Image,
    link: Link,
    hr: HorizontalRule
  }}
  {source}
/>
