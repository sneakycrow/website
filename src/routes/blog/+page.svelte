<script lang="ts">
  import type { PageServerData } from "./$types";
  import PostList from "$lib/components/PostList.svelte";

  export let data: PageServerData;
</script>

<svelte:head>
  <title>brain juice</title>
</svelte:head>

<PostList posts={data.posts} class="col-span-6 row-start-2 row-span-2" />
