<script lang="ts">
  import ExtraLinks from "./ExtraLinks.svelte";
</script>

<footer class={`w-full flex flex-col items-start justify-between space-y-4 ${$$restProps.class}`}>
  <ExtraLinks />
  <p>
    <span class="text-sm">© {new Date().getFullYear()} Sneaky Crow, LLC</span>
    <span class="text-sm">All Rights Reserved</span>
  </p>
</footer>
