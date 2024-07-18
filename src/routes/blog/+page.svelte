<script lang="ts">
  import type { PageServerData } from "./$types";
  import PostList from "$lib/components/post/PostList.svelte";

  export let data: PageServerData;

  const { posts } = data;
</script>

<svelte:head>
  <title>brain juice</title>
</svelte:head>

<PostList {posts} class="lg:col-span-6 row-start-2 row-span-2" />
