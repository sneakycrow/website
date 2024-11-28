<script lang="ts">
  import type { PageServerData } from "./$types";
  import PostList from "$lib/components/PostList.svelte";

  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>brain juice</title>
</svelte:head>

<PostList posts={data.posts} class="lg:col-span-6 row-start-2 lg:row-start-2 row-span-2" />
