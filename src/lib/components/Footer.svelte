<script>
  import BannerLinks from "./BannerLinks.svelte";
</script>

<footer class="bg-white w-full p-2 flex flex-col items-center justify-center divide-y space-y-4">
  <div class="flex flex-nowrap justify-between w-full max-w-[1000px] py-2">
    <div class="flex flex-col text-left items-start w-3/4">
      <slot name="left" />
    </div>
    <div class="flex flex-col text-right items-end w-1/4">
      <slot name="right" />
    </div>
  </div>
  <BannerLinks />
</footer>
