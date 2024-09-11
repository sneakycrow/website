<script lang="ts">
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  import "../app.css";
  import type { LayoutServerData } from "./$types";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import { keywords } from "$lib";
  export let data: LayoutServerData;

  let user: { username: string; avatar: string; role: string } | undefined;
  $: if (data.username && data.avatar) {
    user = {
      username: data.username,
      avatar: data.avatar,
      role: data.role
    };
  }
</script>

<svelte:head>
  <meta name="description" content={data.description} />
  <meta name="keywords" content={keywords.join(", ")} />
  <meta property="og:site_name" content="sneaky crow" />
  <meta property="og:image" content="https://sneakycrow.dev/logo_v3.svg" />
</svelte:head>

<main
  class="grid lg:grid-cols-6 gap-10 grid-rows-main p-4 min-h-screen bg-white dark:bg-black text-black dark:text-white"
>
  <Header
    title={data.title.text}
    link={data.title.link}
    class="row-start-1 row-span-1 col-start-1 lg:col-span-6"
    isLive
  />
  <!-- isLive={data.isLive} -->
  <slot />
  <Footer class="lg:col-span-6 h-full max-h-[200px] self-end" {user} />
</main>
