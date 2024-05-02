<script lang="ts">
  import PostExcerpt from "$lib/components/PostExcerpt.svelte";
  import type { Post } from "$lib/posts";

  export let posts: Post[];
</script>

<div class={`flex flex-col w-full ${$$restProps.class}`}>
  {#each posts as post, i}
    <PostExcerpt {post} />
  {/each}
</div>
