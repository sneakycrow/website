<script lang="ts">
  import Collections from "$lib/components/Collections.svelte";
</script>

<svelte:head>
  <title>sneaky crow</title>
</svelte:head>

<section class="col-start-1 lg:col-span-6 max-w-[1000px] mx-auto space-y-4 text-center">
  <img src="/ada_cropped.png" alt="Ada Lovelace" class="w-96 mx-auto" />
  <p class="text-xl">
    Hey there, I'm Zach. I'm a human being of many titles, and I'm definitely <span
      class="font-bold underline italic uppercase">not</span
    > a crow in a long-coat pretending to be a human.
  </p>
  <p class="text-xl">I like to write software, play video games, make music, read, and more!</p>
</section>
<Collections class="lg:col-span-6 my-20" />
