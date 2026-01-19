<script lang="ts">
  let { ordered, start, children } = $props();
</script>

{#if ordered}
  <ol {start} class="list-disc list-inside">
    {@render children?.()}
  </ol>
{:else}
  <ul class="list-disc list-inside">
    {@render children?.()}
  </ul>
{/if}