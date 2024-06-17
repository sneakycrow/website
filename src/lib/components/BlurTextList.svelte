<script lang="ts">
  export let textList: string[] = [];

  import { blur } from "svelte/transition";

  // Stackoverflow https://stackoverflow.com/a/1527820
  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const getRandomTitle = () => textList[getRandomInt(0, textList.length - 1)];
  let title = getRandomTitle();

  const updateTitle = () => {
    title = getRandomTitle();
  };

  setInterval(updateTitle, 2000);
</script>

<div
  class={`h-[6.8rem] w-full relative flex items-center lg:items-start justify-center lg:justify-start`}
>
  {#key title}
    <p
      transition:blur
      class="absolute text-2xl lg:text-4xl text-gray-400 font-semibold my-2 text-center lg:text-left"
    >
      {title}
    </p>
  {/key}
</div>
