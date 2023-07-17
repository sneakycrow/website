<script>
  import Code from "./post/Code.svelte";
  import Paragraph from "./post/Paragraph.svelte";
  import Link from "./post/Link.svelte";
  import Heading from "./post/Heading.svelte";
  import List from "./post/List.svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let source;
</script>

<SvelteMarkdown
  renderers={{
        code: Code,
        paragraph: Paragraph,
        link: Link,
        heading: Heading,
        list: List
      }}
  source={source}
/>