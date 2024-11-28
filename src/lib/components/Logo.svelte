<script lang="ts">
  interface Props {
    [key: string]: any
  }

  let { ...rest }: Props = $props();
</script>

<a class={`w-14 lg:w-[100px] ${rest.class}`} href="/">
  <img
    alt="Logo for Sneaky Crow, LLC (vector art of a crow with a green baseball cap on)"
    src="/logo_green.svg"
    class="w-auto max-w-20 h-full"
  />
</a>
