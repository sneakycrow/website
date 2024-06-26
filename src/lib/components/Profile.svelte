<script lang="ts">
  import { titles } from "$lib";
  import BlurTextList from "./BlurTextList.svelte";
</script>

<div
  class={`grid lg:grid-cols-4 gap-8 items-center lg:items-start justify-center lg:justify-start w-full ${$$restProps.class}`}
>
  <img
    alt="Zachary Corvidae, owner of Sneaky Crow"
    class="rounded-md border-green-550 shadow-md"
    width={150}
    height={150}
    src="/profile_normal.jpeg"
  />
  <aside class="lg:col-start-2 lg:col-span-3 w-full text-center lg:text-left">
    <h2 class="text-xl lg:text-2xl mb-4 font-semibold">Zachary Corvidae</h2>
    <BlurTextList textList={titles} />
  </aside>
</div>
