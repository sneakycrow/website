<script lang="ts">
  import Article from "$lib/components/post/Article.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<svelte:head>
  <title>{data.post.title} - sneaky crow</title>
  <meta name="description" content={data.post.summary} />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.summary} />
</svelte:head>

<Article post={data.post} class="lg:col-span-6" />
