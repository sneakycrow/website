<script lang="ts">
  import Profile from "$lib/components/Profile.svelte";
  import ProjectList from "$lib/components/ProjectList.svelte";
</script>

<svelte:head>
  <title>sneaky crow</title>
</svelte:head>

<section
  class="col-start-1 lg:col-span-4 row-start-2 lg:row-span-2 max-w-[1000px] space-y-4 text-center"
>
  <img src="/ada_cropped.png" alt="Ada Lovelace" class="w-96 mx-auto" />
  <p class="text-xl">
    Hey there, I'm Zach. I'm a human being of many titles, and I'm definitely <span
      class="font-bold underline italic uppercase">not</span
    > a crow in a long-coat pretending to be a human.
  </p>
  <p class="text-xl">
    I like to write software, play video games, make music, read, and more! Check out my <a
      href="/projects">projects</a
    > for more.
  </p>
</section>
<ProjectList
  class="col-start-1 lg:col-start-5 lg:col-span-2 lg:row-start-2 row-start-3 lg:row-span-2"
/>
