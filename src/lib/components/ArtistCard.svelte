<script lang="ts">
  interface Props {
    url: string;
    image: string;
    name: string;
    width?: number;
    height?: number;
  }

  let { url, image, name, width = 300, height = 300 }: Props = $props();
</script>

<div class="space-y-2 flex flex-col items-center justify-start">
  <a
    href={url}
    target="_blank"
    class="shadow-lg rounded-lg p-4 bg-black dark:bg-white max-w-[300px]"
  >
    <img src={image} alt={name} {width} {height} class="h-[300px] object-cover w-full" />
    <h3 class="font-bold text-xl text-primary-500 text-center mt-4">{name}</h3>
  </a>
</div>
