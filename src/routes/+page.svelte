<script lang="ts">
  import AboutMe from "$lib/components/AboutMe.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<main class="grid grid-cols-4 grid-rows-4 gap-8 p-4 h-screen">
  <Header title="sneaky crow" subtitle="software engineer" class="col-start-1 col-span-4" />
  <AboutMe class="col-start-1 col-span-4 row-start-2 row-span-2 max-w-[1000px]" />
  <Footer class="row-start-4 col-span-4" />
</main>
