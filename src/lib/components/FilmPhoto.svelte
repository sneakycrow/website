<script lang="ts">
  let { photo = {
    source: "",
    alt: "",
    date: ""
  }, ...rest } = $props();
</script>

<div
  class={`flex flex-col justify-center items-center shadow-2xl p-4 bg-black dark:bg-white lg:h-full lg:w-[500px] w-[300px] max-h-[450px] ${rest.class}`}
>
  <div class="w-full h-auto max-h-[300px] overflow-hidden">
    <img class="object-cover" src={photo.source} alt={photo.alt} />
  </div>
  <div
    class="flex flex-col items-center justify-center w-full py-4 bg-black dark:bg-white overflow-y-scroll"
  >
    <p class="text-sm italic text-white dark:text-black text-center">{photo.alt}</p>
    <p class="text-xs italic text-white dark:text-black text-center">{photo.date}</p>
  </div>
</div>
