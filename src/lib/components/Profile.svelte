<script lang="ts">
  import { titles } from "$lib";
  import { blur } from "svelte/transition";

  // Stackoverflow https://stackoverflow.com/a/1527820
  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const getRandomTitle = () => titles[getRandomInt(0, titles.length - 1)];
  let title = getRandomTitle();

  const updateTitle = () => {
    title = getRandomTitle();
  };

  setInterval(updateTitle, 2000);
</script>

<div
  class={`grid lg:grid-flow-col-dense gap-8 items-center lg:items-start justify-center lg:justify-start p-4 ${$$restProps.class}`}
>
  <img
    alt="Zachary Corvidae, owner of Sneaky Crow"
    class="rounded-md border-green-550 shadow-md mx-auto"
    width={150}
    height={150}
    src="/profile_normal.jpeg"
  />
  <aside class="lg:col-start-2 lg:col-span-2 space-y-2 text-center lg:text-left">
    <h2 class="text-xl lg:text-2xl font-semibold">Zachary Corvidae</h2>
    <h3 class="text-2xl lg:text-4xl text-gray-400 font-semibold relative w-full block">
      {#key title}
        <span transition:blur class="absolute">
          {title}
        </span>
      {/key}
    </h3>
  </aside>
</div>
