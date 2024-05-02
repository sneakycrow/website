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

<main class="grid lg:grid-cols-6 grid-flow-row gap-10 p-4 min-h-screen">
  <Header
    title="sneaky crow"
    subtitle="software engineer"
    class="col-start-1 lg:col-span-6"
    {user}
  />
  <slot />
  <Footer class="lg:col-span-6 max-h-[200px] self-end" {user} />
</main>
