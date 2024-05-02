<script lang="ts">
  import Article from "$lib/components/Article.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<svelte:head>
  <title>{data.post.title} - sneaky crow</title>
</svelte:head>

<Article post={data.post} class="col-span-6" />
