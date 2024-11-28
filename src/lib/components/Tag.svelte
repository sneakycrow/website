<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<p class="px-2 py-1 rounded-md bg-primary-500 text-white font-bold w-min m-2">
  {@render children?.()}
</p>
