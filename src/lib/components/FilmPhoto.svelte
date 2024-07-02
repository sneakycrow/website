<script lang="ts">
  import Thumbnail from "./Thumbnail.svelte";
  export let photo = {
    source: "",
    alt: "",
    date: ""
  };
</script>

<div class="flex flex-col justify-center items-center bg-black">
  <Thumbnail source={photo.source} alt={photo.alt} />
  <div class="flex flex-col w-full bg-black pb-6">
    <p class="text-sm italic text-white text-center">{photo.alt}</p>
    <p class="text-xs italic text-white text-center">{photo.date}</p>
  </div>
</div>
