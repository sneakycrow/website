<script lang="ts">
  export let source = "";
  export let alt: string;
</script>

<div
  class="overflow-hidden min-w-full min-h-[200px] max-h-[600px] lg:min-h-[300px] border-[16px] lg:border-[24px] border-black"
>
  <img class="max-h-full object-cover" src={source} {alt} />
</div>
