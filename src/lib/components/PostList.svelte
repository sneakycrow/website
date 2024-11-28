<script lang="ts">
  import PostExcerpt from "$lib/components/post/PostExcerpt.svelte";
  import type { Post } from "$lib/posts";

  interface Props {
    posts: Post[];
    [key: string]: any
  }

  let { posts, ...rest }: Props = $props();
</script>

<div class={`flex flex-col space-y-8 w-full ${rest.class}`}>
  {#each posts as post (post.id)}
    <PostExcerpt {post} />
  {/each}
</div>
