<script lang="ts">
  import Header from "$lib/components/Header.svelte";

  import type { PageServerData } from "./$types";
  import PostList from "$lib/components/PostList.svelte";
  import Footer from "$lib/components/Footer.svelte";

  export let data: PageServerData;
</script>

<svelte:head>
  <title>brain juice</title>
</svelte:head>

<main class="flex flex-col p-4 min-h-screen">
  <Header title="brain juice" link="/blog" />
  <PostList posts={data.posts} />
  <Footer class="mt-auto" />
</main>
