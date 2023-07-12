<script lang="ts">
  import Header from "../../components/Header.svelte";
  import Title from "../../components/Title.svelte";
  import PostExcerpt from "../../components/PostExcerpt.svelte";
  import BannerLinks from "../../components/BannerLinks.svelte";

  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<main class="grid gap-4 grid-flow-row bg-black p-4 min-h-screen">
  <Header subtitle="award-winning blog" title="self*-awarded" />
  <div class="flex flex-col w-full bg-white p-6 lg:items-center">
    <Title class="lg:w-3/4 max-w-[1000px]">Posts</Title>
    <div class="lg:w-3/4 max-w-[1000px] divide-y-2">
      {#each data.posts as post, i}
        <PostExcerpt {post} />
      {/each}
    </div>
  </div>
  <BannerLinks />
</main>
 