<script lang="ts">
  import PostExcerpt from "$lib/components/post/PostExcerpt.svelte";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import type { Post } from "$lib/posts";

  export let posts: Post[];

  export let showDrafts = false;
  $: filteredPosts = showDrafts ? posts : posts.filter((post) => !post.draft);
  $: draftExists = posts.some((post) => post.draft);
</script>

<div class={`flex flex-col space-y-8 w-full ${$$restProps.class}`}>
  {#if draftExists}
    <SlideToggle
      class="ml-auto text-sm"
      name="show-drafts-slider"
      active="bg-primary-500"
      size="sm"
      bind:checked={showDrafts}
    >
      Show drafts
    </SlideToggle>
  {/if}
  {#each filteredPosts as post}
    <PostExcerpt {post} />
  {/each}
</div>
