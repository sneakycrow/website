<script lang="ts">
  import type { Post } from "$lib/posts";
  import MarkdownRenderer from "./MarkdownRenderer.svelte";

  export let post: Post;
</script>

<div class={`grid grid-cols-2 items-start justify-center my-10 ${$$restProps.class}`}>
  <h2 class="text-2xl lg:text-4xl mb-10 font-bold col-start-1 col-span-2">{post.title}</h2>
  <article class="w-full col-start-1 col-span-2">
    <MarkdownRenderer source={post.body} />
  </article>
</div>
