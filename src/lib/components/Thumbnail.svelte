<script lang="ts">
  export let source = "";
  export let alt: string;
  export let hover = "";
</script>

<div
  class={`w-full border-[16px] lg:border-[24px] drop-shadow-lg border-black transition-colors ease-in duration-300 ${hover}`}
>
  <img class="object-cover" src={source} {alt} />
</div>
