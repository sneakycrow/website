<script lang="ts">
  import Header from "$lib/components/Header.svelte";

  import type { PageServerData } from "./$types";
  import PostList from "$lib/components/PostList.svelte";
  import Footer from "$lib/components/Footer.svelte";

  export let data: PageServerData;
</script>

<main class="grid gap-4 grid-flow-row bg-black p-4 min-h-screen">
  <Header subtitle="award-winning blog" title="brain juice" />
  <PostList posts={data.posts} />
  <Footer>
    <div class="flex flex-col space-y-2" slot="left">
      <span class="text-sm">© {new Date().getFullYear()} Sneaky Crow, LLC</span>
      <span class="text-sm">All Rights Reserved</span>
    </div>
  </Footer>
</main>
