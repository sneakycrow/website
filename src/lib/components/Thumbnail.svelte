<script lang="ts">
  export let source = "";
  export let alt: string;
  export let hover = "";
</script>

<div
  class={`overflow-hidden w-full max-h-[500px] border-[16px] lg:border-[24px] drop-shadow-lg border-black transition-colors ease-in duration-300 ${hover}`}
>
  <img class="max-h-full object-cover" src={source} {alt} height={500} />
</div>
