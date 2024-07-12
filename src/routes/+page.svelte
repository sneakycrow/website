<script lang="ts">
  import Collections from "$lib/components/Collections.svelte";
</script>

<svelte:head>
  <title>sneaky crow</title>
</svelte:head>

<section
  class="col-start-1 lg:col-span-6 min-h-[50vh] max-w-[1000px] mx-auto space-y-4 text-center flex flex-col justify-center items-center"
>
  <img
    src="/ada_cropped.png"
    alt="Ada the crow, the mascot of Sneaky Crow"
    style="animation: bounce 3s infinite;"
    width={300}
  />
  <p class="text-xl">
    Hey there, I'm Zach. I'm a human being of many titles, and I'm definitely <span
      class="font-bold underline italic uppercase">not</span
    > a crow in a long-coat pretending to be a human.
  </p>
  <p class="text-xl">I like to write software, play video games, make music, read, and more!</p>
</section>
<Collections class="lg:col-span-6 my-20" />
