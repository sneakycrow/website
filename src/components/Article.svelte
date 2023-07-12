<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import Code from "./post/Code.svelte";
  import Paragraph from "./post/Paragraph.svelte";
  import Link from "./post/Link.svelte";
  import Heading from "./post/Heading.svelte";
  import List from "./post/List.svelte";

  export let post: {
    title: string;
    date: string;
    body: string;
  };
</script>

<div class="bg-white p-6 flex justify-center">
  <article class="space-y-8 w-full lg:w-3/4 max-w-[1000px]">
    <SvelteMarkdown renderers={{ code: Code, paragraph: Paragraph, link: Link, heading: Heading, list: List }}
                    source={post.body} />
  </article>
</div>
