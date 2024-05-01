<script lang="ts">
  import AboutMe from "$lib/components/AboutMe.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import ProjectList from "$lib/components/ProjectList.svelte";
</script>

<svelte:head>
  <title>sneaky crow</title>
</svelte:head>

<main class="grid lg:grid-cols-6 grid-flow-row gap-10 p-4 h-screen">
  <Header title="sneaky crow" subtitle="software engineer" class="col-start-1 lg:col-span-6" />
  <AboutMe class="col-start-1 lg:col-span-3 row-start-2 row-span-2 max-w-[1000px]" />
  <ProjectList class="col-start-1 lg:col-start-5 lg:col-span-2 row-span-2" />
  <Footer class="lg:col-span-6" />
</main>
