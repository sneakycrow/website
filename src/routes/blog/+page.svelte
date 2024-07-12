<script lang="ts">
  import type { PageServerData } from "./$types";
  import PostList from "$lib/components/PostList.svelte";

  export let data: PageServerData;
  let isDraftsEnabled = false;
  $: sortedPosts = data.posts.filter((post) => isDraftsEnabled || !post.draft);
  const toggleDrafts = () => (isDraftsEnabled = !isDraftsEnabled);
  console.log(data.posts);
</script>

<svelte:head>
  <title>brain juice</title>
</svelte:head>

<section class="lg:col-span-6 row-start-2 row-span-2 flex flex-col">
  <aside class="ml-auto">
    <button
      on:click={toggleDrafts}
      class={`${isDraftsEnabled ? "font-bold text-black" : "font-light text-gray-500"}`}
      >Drafts</button
    >
  </aside>
  <PostList posts={sortedPosts} />
</section>
