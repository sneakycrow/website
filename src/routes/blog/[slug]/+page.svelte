<script lang="ts">
  import Article from "$lib/components/Article.svelte";
  import type { PageServerData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  export let data: PageServerData;
</script>

<svelte:head>
  <title>{data.post.title} - sneaky crow</title>
</svelte:head>

<main class="flex flex-col p-4">
  <Header title="brain juice" link="/blog" />
  <Article post={data.post} />
  <Footer />
</main>
