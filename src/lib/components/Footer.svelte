<footer class="bg-white w-full p-2 flex items-center justify-center">
  <div class="flex flex-nowrap justify-between w-full max-w-[1000px]">
    <div class="flex flex-col text-left items-start w-3/4">
      <slot name="left" />
    </div>
    <div class="flex flex-col text-right items-end w-1/4">
      <slot name="right" />
    </div>
  </div>
</footer>