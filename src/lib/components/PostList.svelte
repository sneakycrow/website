<script lang="ts">
  import PostExcerpt from "$lib/components/PostExcerpt.svelte";
  import Title from "$lib/components/Title.svelte";
  import type { Post } from "$lib/posts";

  export let posts: Post[];
  export let title = "Posts";
  export let cols = "grid-cols-1";
</script>

<div class="flex flex-col w-full bg-white p-6 lg:items-center">
  <div class="lg:w-3/4 max-w-[1000px]">
    <Title>{title}</Title>
    <div class={`divide-green-100 grid ${cols}`}>
      {#each posts as post, i}
        <PostExcerpt {post} />
      {/each}
    </div>
  </div>
</div>