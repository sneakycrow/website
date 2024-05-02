<script lang="ts">
  import AboutMe from "$lib/components/AboutMe.svelte";
  import ProjectList from "$lib/components/ProjectList.svelte";
</script>

<svelte:head>
  <title>sneaky crow</title>
</svelte:head>

<AboutMe class="col-start-1 lg:col-span-3 row-start-2 row-span-2 max-w-[1000px]" />
<ProjectList class="col-start-1 lg:col-start-5 lg:col-span-2 row-span-2" />
