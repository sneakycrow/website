<script lang="ts">
  export let url: string;
  export let image: string;
  export let name: string;
  export let width = 300;
  export let height = 300;
</script>

<div class="space-y-2 flex flex-col items-center justify-center">
  <a href={url} target="_blank" class="shadow-lg rounded-lg p-4 bg-black dark:bg-white">
    <img src={image} alt={name} {width} {height} class="object-cover max-h-[300px] max-w-[300px]" />
    <h3 class="font-bold text-xl text-primary-500 text-center mt-4">{name}</h3>
  </a>
</div>
