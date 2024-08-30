<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";
  type PanelLink = { copy: string; url: string; id: string };
  const panelLinks: PanelLink[] = [
    { copy: "Profile", url: "/settings/me", id: "profile" },
    { copy: "Users", url: "/settings/admin", id: "users" },
    { copy: "Connected Accounts", url: "/settings/accounts", id: "accounts" }
  ];
</script>

<nav class="lg:col-span-1">
  {#each panelLinks as panel}
    <a
      href={panel.url}
      class="px-4 py-2 rounded-md flex flex-nowrap text-black"
      class:bg-primary-500={$page.url.pathname === panel.url}
    >
      <Icon icon="mdi:account" class={`w-6 h-6`} />
      {panel.copy}
    </a>
  {/each}
</nav>

<div class="table-container lg:col-span-5">
  <slot />
</div>
