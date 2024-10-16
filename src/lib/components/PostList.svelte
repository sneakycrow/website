<script lang="ts">
  import PostExcerpt from "$lib/components/post/PostExcerpt.svelte";
  import type { Post } from "$lib/posts";

  export let posts: Post[];
</script>

<div class={`flex flex-col space-y-8 w-full ${$$restProps.class}`}>
  {#each posts as post (post.id)}
    <PostExcerpt {post} />
  {/each}
</div>
