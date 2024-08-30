<script lang="ts">
  import type { LayoutServerData } from "./$types";
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";
  const userPanelLinks = [
    { copy: "Profile", url: "/settings/me", id: "profile" },
    { copy: "Connected Accounts", url: "/settings/accounts", id: "accounts" }
  ];
  const adminPanelLinks = [{ copy: "Users", url: "/settings/admin", id: "users" }];

  export let data: LayoutServerData;
  $: displayedLinks = {
    user: userPanelLinks.filter((link) => data.allowedPanels.includes(link.id)),
    admin: adminPanelLinks.filter((link) => data.allowedPanels.includes(link.id))
  };
</script>

<nav class="lg:col-span-1">
  {#each displayedLinks.user as userPanel}
    <a
      href={userPanel.url}
      class="px-4 py-2 rounded-md flex flex-nowrap text-black"
      class:bg-primary-500={$page.url.pathname === userPanel.url}
    >
      <Icon icon="mdi:account" class={`w-6 h-6`} />
      {userPanel.copy}
    </a>
  {/each}
  {#each displayedLinks.admin as adminPanel}
    <a
      href={adminPanel.url}
      class="px-4 py-2 rounded-md flex flex-nowrap text-black"
      class:bg-primary-500={$page.url.pathname === adminPanel.url}
    >
      <Icon icon="mdi:account" class={`w-6 h-6`} />
      {adminPanel.copy}
    </a>
  {/each}
</nav>

<div class="table-container lg:col-span-5">
  <slot />
</div>
