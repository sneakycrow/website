<script>

  export let depth;
  export let raw;
</script>

{#if depth === 1}
  <h1 class="text-xl font-bold my-4">
    <slot />
  </h1>
{:else if depth === 2}
  <h2 class="text-xl font-bold my-4">
    <slot />
  </h2>
{:else if depth === 3}
  <h3 class="text-lg font-bold my-4">
    <slot />
  </h3>
{:else if depth === 4}
  <h4 class="font-bold my-4">
    <slot />
  </h4>
{:else if depth === 5}
  <h5 class="font-bold my-2">
    <slot />
  </h5>
{:else if depth === 6}
  <h6 class="font-bold">
    <slot />
  </h6>
{:else}
  {raw}
{/if}