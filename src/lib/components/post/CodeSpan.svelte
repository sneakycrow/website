<script lang="ts">
  export let raw: string;

  $: code = raw.replace(/`/g, "");
</script>

<code class="bg-gray-100 text-green-600 p-2 rounded-sm font-mono">
  {code}
</code>