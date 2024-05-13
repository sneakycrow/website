<script lang="ts">
  export let raw: string;

  $: code = raw.replace(/`/g, "");
</script>

<code class="bg-gray-800 text-green-600 px-2 py-1 rounded-sm font-mono font-semibold">
  {code}
</code>
