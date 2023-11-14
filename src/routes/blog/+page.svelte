<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";

  import type { PageServerData } from "./$types";
  import PostList from "$lib/components/PostList.svelte";

  export let data: PageServerData;
</script>

<main class="grid gap-4 grid-flow-row bg-black p-4 min-h-screen">
  <Header subtitle="award-winning blog" title="brain juice" />
  <PostList posts={data.posts} />
  <BannerLinks />
</main>
 