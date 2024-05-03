<script lang="ts">
  import type { PageServerData } from "./$types";
  import Icon from "@iconify/svelte";

  export let data: PageServerData;
</script>

<section class="col-start-1 lg:col-span-6 flex flex-col items-center justify-center text-center">
  <h3 class="text-4xl text-gray-300 font-semibold">Connected Accounts</h3>
  {#each data.accounts as account}
    {#if account.provider === "github"}
      <Icon class="ml-2" icon="mdi:github" width={64} />
    {/if}
  {/each}
</section>
<p class="col-start-2 col-span-4 text-center italic text-gray-400">
  Thank you for signing up! I'm planning on adding extra featureset's throughout the website via
  connected accounts. Check back in soon!
  <br />
  - Zach
</p>
