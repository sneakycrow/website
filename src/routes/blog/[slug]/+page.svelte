<script lang="ts">
  import Hero from "../../../components/Hero.svelte";
  import Article from "../../../components/Article.svelte";
  import BannerLinks from "../../../components/BannerLinks.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<main class="flex flex-col gap-4 bg-black p-4">
  <header>
    <Hero homeURL="/blog" subtitle="" title={data.post.title} />
  </header>
  <Article post={data.post} />
  <BannerLinks />
</main>
