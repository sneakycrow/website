<script lang="ts">
  import { titles } from "$lib";
  import BlurTextList from "./BlurTextList.svelte";
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
    <BlurTextList textList={titles} />
  </aside>
</div>
