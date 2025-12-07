<script lang="ts">
  import Article from "$lib/components/post/Article.svelte";
  import type { PageServerData } from "./$types";

  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>{data.post.title} - sneaky crow</title>
  <meta name="description" content={data.post.summary} />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.summary} />
</svelte:head>

<Article post={data.post} class="lg:col-span-6" backTo="/blog" />
