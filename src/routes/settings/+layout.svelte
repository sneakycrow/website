<script lang="ts">
  import { page } from "$app/state";
  import Account from "$lib/components/icons/Account.svelte";
  import Gear from "$lib/components/icons/Gear.svelte";
  import { type ComponentType } from "svelte";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
  type PanelLink = { copy: string; url: string; id: string; icon: ComponentType };
  const panelLinks: PanelLink[] = [
    { copy: "Users", url: "/settings/admin", id: "users", icon: Account },
    { copy: "Settings", url: "/settings", id: "settings", icon: Gear }
  ];

  const ICON_SIZE = 24;
</script>

<nav class="lg:col-span-1">
  {#each panelLinks as panel}
    <a
      href={panel.url}
      class="px-4 py-2 rounded-md flex flex-nowrap text-black dark:text-white items-center space-x-2"
      class:bg-primary-500={page.url.pathname === panel.url}
    >
      <panel.icon width={ICON_SIZE} height={ICON_SIZE} />
      <span>{panel.copy}</span>
    </a>
  {/each}
</nav>

<div class="table-container lg:col-span-5">
  {@render children?.()}
</div>
