<script lang="ts">
  import Title from "./Title.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";


  export let content: string;
  export let source: string;
  export let image: string = "";

  let ready = false;
  onMount(() => ready = true);
</script>

<div class="bg-white w-full flex justify-center items-center p-4 min-h-[150px]">
  <div class="max-w-[1000px] w-full space-y-4 flex flex-col" in:fade={{ delay: 250, duration: 300 }}>
    <Title size="sm">Message of the Day</Title>
    {#if ready}
      <div class="self-center text-lg">
        {@html content}
      </div>
      {#if image}
        <img class="self-center w-full max-w-[500px] rounded-lg shadow-lg" src={image} alt="" />
      {/if}
      <a class="text-green-550 hover:underline text-xs self-end hover:cursor-pointer flex items-center justify-center"
         href={source}
         target="_blank">
        Source
        <Icon icon="ri:external-link-fill" size={24} class="ml-1" />
      </a>
    {/if}
  </div>
</div>