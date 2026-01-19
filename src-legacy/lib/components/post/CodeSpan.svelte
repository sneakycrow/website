<script lang="ts">
  interface Props {
    raw: string;
  }

  let { raw }: Props = $props();

  let code = $derived(raw.replace(/`/g, ""));
</script>

<code class="bg-gray-800 text-green-600 px-2 py-1 rounded-sm font-mono font-semibold">
  {code}
</code>
