<script lang="ts">
  import Title from "./Title.svelte";

  export let content: string;
  export let source: string;
</script>

<div class="bg-white w-full flex justify-center py-4">
  <div class="max-w-[1000px] w-full space-y-4 flex flex-col">
    <Title size="sm">Message of the Day</Title>
    <div class="self-center text-lg">
      {@html content}
    </div>
    <a class="text-green-550 hover:underline text-xs self-end hover:cursor-pointer after:content-['_↗']" href={source}
       target="_blank">Source</a>
  </div>
</div>