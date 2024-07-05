<script lang="ts">
  export let source = "";
  export let alt: string;
</script>

<div
  class="overflow-hidden min-w-full min-h-[200px] max-h-[400px] lg:min-h-[300px] lg:h-[500px] border-[16px] lg:border-[24px] border-black dark:border-white"
>
  <img class="max-h-full w-full object-cover" src={source} {alt} />
</div>
