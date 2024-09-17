<script lang="ts">
  import { type ComponentType } from "svelte";
  import type { PageServerData } from "./$types";
  import GitHub from "$lib/components/icons/GitHub.svelte";
  import Spotify from "$lib/components/icons/Spotify.svelte";
  import Twitch from "$lib/components/icons/Twitch.svelte";
  import Discord from "$lib/components/icons/Discord.svelte";
  import Account from "$lib/components/icons/Account.svelte";

  export let data: PageServerData;
  type AvailableProvider = "github" | "spotify" | "twitch" | "discord";
  const availableAccounts: AvailableProvider[] = ["github", "spotify", "twitch", "discord"];
  const isConnectedAccount = (provider: string) => {
    return data.accounts.map((acc) => acc.provider).includes(provider);
  };
  const getIconData = (provider: AvailableProvider): { icon: ComponentType; color: string } => {
    switch (provider) {
      case "github": {
        return {
          icon: GitHub,
          color: "black"
        };
      }
      case "spotify": {
        return {
          icon: Spotify,
          color: "#1DB954"
        };
      }
      case "twitch": {
        return {
          icon: Twitch,
          color: "#9146FF"
        };
      }
      case "discord": {
        return {
          icon: Discord,
          color: "#5865F2"
        };
      }
      default:
        return {
          icon: Account,
          color: "black"
        };
    }
  };
</script>

<section class="col-start-1 lg:col-span-6 flex flex-col items-center justify-center text-center">
  <h3 class="text-4xl text-gray-300 font-semibold my-10">Connected Accounts</h3>
  <ul class="flex space-x-6">
    {#each availableAccounts as account}
      <li class="flex flex-col items-center">
        <svelte:component
          this={getIconData(account).icon}
          class={`ml-2 ${isConnectedAccount(account) ? "opacity-100" : "opacity-50"}`}
          color={`${isConnectedAccount(account) ? getIconData(account).color : "gray"}`}
          width={64}
          height={64}
        />
        {#if !isConnectedAccount(account)}
          <a
            class="text-xs block py-2 px-4 bg-primary-500 text-white rounded mt-4"
            href={`/login/${account}`}>Connect</a
          >
        {/if}
      </li>
    {/each}
  </ul>
</section>
