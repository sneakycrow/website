<script lang="ts">
  import "../app.css";
  import type { LayoutServerData } from "./$types";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  export let data: LayoutServerData;

  let user: { username: string; avatar: string } | undefined;
  $: if (data.username && data.avatar) {
    user = {
      username: data.username,
      avatar: data.avatar
    };
  }
</script>

<svelte:head>
  <meta name="description" content={data.description} />
</svelte:head>

<main class="grid lg:grid-cols-6 gap-10 p-4 min-h-screen">
  <Header
    title={data.title.text}
    link={data.title.link}
    class="row-start-1 row-span-1 col-start-1 lg:col-span-6"
    isLive={data.isLive}
    {user}
  />
  <slot />
  <Footer class="lg:row-start-4 lg:col-span-6 max-h-[200px] self-end" {user} />
</main>
