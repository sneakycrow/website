<script lang="ts">
  import type { Post } from "$lib/posts";
  import MarkdownRenderer from "./MarkdownRenderer.svelte";
  import { formatDistanceToNow, format } from "date-fns";

  export let post: Post;
</script>

<div class={`grid grid-cols-4 items-start justify-center my-10 ${$$restProps.class}`}>
  <article class="lg:text-lg w-full col-start-1 col-span-4 lg:col-span-3 max-w-[1000px] space-y-6">
    <a href={post.slug} class="text-black">
      <h2 class="text-3xl lg:text-4xl font-bold">{post.title}</h2>
    </a>
    <aside class="space-y-2">
      <p class="text-sm text-gray-500 leading-3">
        Published on {format(post.date, "LLLL do, yyyy")} ({formatDistanceToNow(post.date)} ago)
      </p>
      <p class="text-sm text-gray-500 leading-3">
        <span> {post.reading_minutes} min read </span>
      </p>
    </aside>
    <MarkdownRenderer source={post.body} />
  </article>
</div>
