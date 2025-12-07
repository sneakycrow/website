<script lang="ts">
  import PostExcerpt from "$lib/components/post/PostExcerpt.svelte";
  import type { Post } from "$lib/posts";

  interface Props {
    posts: Post[];
    class?: string;
  }

  let { posts, class: className }: Props = $props();

  let groupedPosts = $derived.by(() => {
    const grouped: { [key: string]: Post[] } = {};
    posts.forEach((post) => {
      const year = post.date.split("-")[0];
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });
    return grouped;
  });
</script>

<div class={`flex flex-col space-y-20 ${className}`}>
  {#each Object.keys(groupedPosts).reverse() as yPost}
    <div
      class="drop-shadow-2xl lg:p-4 p-0 w-full flex lg:flex-row flex-col lg:space-x-4 lg:space-y-0 space-y-4"
    >
      <h2 class="lg:text-5xl text-3xl lg:text-left text-center font-bold text-secondary-300">
        {yPost}
      </h2>
      <div class={`flex flex-col space-y-4 w-full`}>
        {#each groupedPosts[yPost] as post (post.id)}
          <PostExcerpt {post} />
        {/each}
      </div>
    </div>
  {/each}
</div>
