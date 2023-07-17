<script lang="ts">
  import type { Post } from "$lib/posts";
  import MarkdownRenderer from "./MarkdownRenderer.svelte";

  export let post: Post;
</script>

<div class="bg-white p-6 flex justify-center">
  <article class="space-y-8 w-full lg:w-3/4 max-w-[1000px]">
    <MarkdownRenderer source={post.body} />
  </article>
</div>
