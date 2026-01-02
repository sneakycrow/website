<script lang="ts">
  import GitHub from "./icons/GitHub.svelte";
  interface Props {
    class: string;
  }

  let { class: className }: Props = $props();
</script>

<footer
  class={`flex flex-col lg:flex-row justify-between items-start lg:items-end z-10 ${className}`}
>
  <p class="flex flex-col">
    <span class="text-sm">© {new Date().getFullYear()} Sneaky Crow, LLC</span>
    <span class="text-sm">All Rights Reserved</span>
    <a
      class="font-semibold flex items-center space-x-2"
      href="https://github.com/sneakycrow/website"
      target="_blank"
    >
      <span>source code for this site</span>
      <GitHub class="inline-block w-4 h-4" />
    </a>
  </p>
</footer>
