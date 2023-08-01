<script lang="ts">
  export let raw: string;

  $: code = raw.replace(/`/g, "");
</script>

<code class="font-bold bg-gray-800 text-green-500 p-2 rounded-sm">
  {code}
</code>