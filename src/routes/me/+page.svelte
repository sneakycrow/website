<script lang="ts">
  import type { PageServerData } from "./$types";
  import Icon from "@iconify/svelte";

  export let data: PageServerData;
  type AvailableProvider = "github" | "spotify" | "twitch";
  const availableAccounts: AvailableProvider[] = ["github", "spotify", "twitch"];
  const isConnectedAccount = (provider: string) => {
    return data.accounts.map((acc) => acc.provider).includes(provider);
  };
  const getIconData = (provider: AvailableProvider): { icon: string; color: string } => {
    switch (provider) {
      case "github": {
        return {
          icon: "mdi:github",
          color: "black"
        };
      }
      case "spotify": {
        return {
          icon: "mdi:spotify",
          color: "#1DB954"
        };
      }
      case "twitch": {
        return {
          icon: "mdi:twitch",
          color: "#9146FF"
        };
      }
      default:
        return {
          icon: "mdi:account",
          color: "black"
        };
    }
  };
</script>

<section class="col-start-1 lg:col-span-6 flex flex-col items-center justify-center text-center">
  <h3 class="text-4xl text-gray-300 font-semibold my-10">Connected Accounts</h3>
  <ul class="flex space-x-6">
    {#each availableAccounts as account}
      {#if getIconData(account) !== null}
        <li class="flex flex-col items-center">
          <Icon
            class={`ml-2 ${isConnectedAccount(account) ? "opacity-100" : "opacity-50"}`}
            icon={getIconData(account).icon}
            color={`${isConnectedAccount(account) ? getIconData(account).color : "gray"}`}
            width={64}
          />
          {#if !isConnectedAccount(account)}
            <a
              class="text-xs block py-2 px-4 bg-primary-500 text-white rounded mt-4"
              href={`/login/${account}`}>Connect</a
            >
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
</section>
<p class="lg:col-start-2 lg:col-span-4 text-center italic text-gray-400">
  Thank you for signing up! I'm planning on adding extra featureset's throughout the website via
  connected accounts. Check back in soon!
  <br />
  - Zach
</p>
