<script lang="ts">
  import type { LayoutServerData } from "./$types";
  import { page } from "$app/stores";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  const userPanelLinks = [
    { copy: "Profile", url: "/settings/me", id: "profile", icon: "gg:profile" },
    {
      copy: "Connected Accounts",
      url: "/settings/accounts",
      id: "accounts",
      icon: "icon-park-solid:connection"
    }
  ];
  const adminPanelLinks = [
    { copy: "Users", url: "/settings/admin/users", id: "users", icon: "mdi:users" },
    {
      copy: "Content",
      url: "/settings/admin/content",
      id: "content",
      icon: "mingcute:content-ai-fill",
      sublinks: [
        {
          copy: "Posts",
          url: "/settings/admin/content/posts",
          id: "posts",
          icon: "mdi:pencil"
        },
        {
          copy: "Books",
          url: "/settings/admin/content/books",
          id: "books",
          icon: "mdi:book"
        },
        {
          copy: "Art",
          url: "/settings/admin/content/art",
          id: "art",
          icon: "mdi:palette"
        }
      ]
    }
  ];

  export let data: LayoutServerData;
  $: displayedLinks = {
    user: userPanelLinks.filter((link) => data.allowedPanels.includes(link.id)),
    admin: adminPanelLinks.filter((link) => data.allowedPanels.includes(link.id))
  };
</script>

<nav class="min-w-max lg:col-span-1 pr-4 border-r-2 border-tertiary-600">
  <p class="mt-4 mb-2 font-light text-xs">Settings</p>
  {#each displayedLinks.user as userPanel}
    <a
      href={userPanel.url}
      class="px-4 py-2 rounded-md flex flex-nowrap text-black hover:variant-soft-primary space-x-2"
      class:bg-primary-500={$page.url.pathname === userPanel.url}
    >
      <Icon icon={userPanel.icon} class={`w-6 h-6`} />
      <span>{userPanel.copy}</span>
    </a>
  {/each}
  <p class="mt-4 mb-2 font-light text-xs">Admin</p>
  {#each displayedLinks.admin as adminPanel}
    {#if adminPanel.sublinks}
      <Accordion regionPanel="space-y-1">
        <AccordionItem open>
          <svelte:fragment slot="lead">
            <Icon icon={adminPanel.icon} class={`w-6 h-6`} />
          </svelte:fragment>
          <svelte:fragment slot="summary">
            <p class="font-semibold">{adminPanel.copy}</p>
          </svelte:fragment>
          <svelte:fragment slot="content">
            {#each adminPanel.sublinks as link}
              <a
                href={link.url}
                class="px-4 py-2 rounded-md flex flex-nowrap text-black hover:variant-soft-primary space-x-2"
                class:bg-primary-500={$page.url.pathname.startsWith(link.url)}
              >
                <Icon icon={link.icon} class={`w-6 h-6`} />
                <span>{link.copy}</span>
              </a>
            {/each}
          </svelte:fragment>
        </AccordionItem>
      </Accordion>
    {:else}
      <a
        href={adminPanel.url}
        class="px-4 py-2 rounded-md flex flex-nowrap text-black hover:variant-soft-primary space-x-2"
        class:bg-primary-500={$page.url.pathname.startsWith(adminPanel.url)}
      >
        <Icon icon={adminPanel.icon} class={`w-6 h-6`} />
        <span>{adminPanel.copy}</span>
      </a>
    {/if}
  {/each}
</nav>

<div class="lg:col-span-5">
  <slot />
</div>
