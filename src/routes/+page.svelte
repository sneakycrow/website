<script lang="ts">
  import AboutMe from "$lib/components/AboutMe.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <title>sneaky crow</title>
</svelte:head>

<main class="grid lg:grid-cols-4 grid-flow-row gap-10 p-4 h-screen">
  <Header title="sneaky crow" subtitle="software engineer" class="col-start-1 lg:col-span-4" />
  <AboutMe class="col-start-1 lg:col-span-4 row-start-2 row-span-2 max-w-[1000px]" />
  <Footer class="row-start-4 lg:col-span-4" />
</main>
