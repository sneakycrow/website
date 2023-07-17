<script lang="ts">
  export let size: "sm" | "base" | "xl" = "xl";

</script>

<h3 class={`text-${size} font-bold underline decoration-4 decoration-green-550`}>
  <slot />
</h3>
