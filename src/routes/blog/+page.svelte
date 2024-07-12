<script lang="ts">
  import type { PageServerData } from "./$types";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import PostList from "$lib/components/PostList.svelte";

  export let data: PageServerData;
  let isDraftsEnabled = false;
  $: sortedPosts = data.posts.filter((post) => isDraftsEnabled || !post.draft);
</script>

<svelte:head>
  <title>brain juice</title>
</svelte:head>

<aside class="lg:col-span-6 text-right row-start-2 row-span-2 items-start justify-start">
  <SlideToggle
    name="enable-drafts"
    class={`font-semibold ${isDraftsEnabled ? "text-black" : "text-gray-400"}`}
    bind:checked={isDraftsEnabled}
    size="sm"
    active="bg-primary-500"
  >
    Drafts
  </SlideToggle>
</aside>
<PostList posts={sortedPosts} class="lg:col-span-6 row-start-4 row-span-1" />
