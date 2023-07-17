<script lang="ts">
  import Article from "$lib/components/Article.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";
  import type { PageServerData } from "./$types";
  import Title from "$lib/components/Title.svelte";
  import Header from "$lib/components/Header.svelte";

  export let data: PageServerData;
</script>

<main class="flex flex-col gap-4 bg-black p-4">
  <Header subtitle="" title={data.post.title} />
  <Article post={data.post} />
  {#if data.series?.length ?? [] > 0}
    <div class="w-full bg-white flex flex-col items-center justify-center">
      <div class="p-4 lg:p-0 lg:py-2 max-w-[1000px] w-full">
        <Title>Series</Title>
        <ol
          class="list-decimal list-inside grid grid-flow-row items-center space-y-2 text-lg">
          {#each data.series as post}
            <li class={`${post.slug === data.post.slug ? "text-green-550 opacity-60" : "text-green-550"}`}>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </li>
          {/each}
        </ol>
      </div>
    </div>
  {/if}
  <BannerLinks />
</main>
