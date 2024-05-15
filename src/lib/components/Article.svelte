<script lang="ts">
  import type { Post } from "$lib/posts";
  import MarkdownRenderer from "./MarkdownRenderer.svelte";

  export let post: Post;
</script>

<div class={`grid grid-cols-4 items-start justify-center my-10 ${$$restProps.class}`}>
  <h2 class="text-3xl lg:text-4xl mb-10 font-bold col-start-1 col-span-3">{post.title}</h2>
  <article class="text-lg w-full col-start-1 col-span-3 max-w-[1000px]">
    <MarkdownRenderer source={post.body} />
  </article>
</div>
