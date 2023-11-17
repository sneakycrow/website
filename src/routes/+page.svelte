<script lang="ts">
  import type { PageServerData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";
  import AboutMe from "$lib/components/AboutMe.svelte";
  import PostList from "$lib/components/PostList.svelte";

  export let user: { username: string; avatar: string; } | undefined;
  export let data: PageServerData;
</script>

<main class="flex flex-col space-y-4 p-4 min-h-screen max-w-full">
  <Header subtitle="software wizard" title="Sneaky Crow" />
  <BannerLinks />
  {#if data.posts}
    <PostList posts={data.posts} title="Recent Posts" />
  {/if}
  <AboutMe />
</main>