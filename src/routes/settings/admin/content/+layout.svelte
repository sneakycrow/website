<script lang="ts">
  import { page } from "$app/stores";
  import { TabGroup, TabAnchor } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";

  const tabs = [
    { copy: "Posts", url: "/settings/admin/content/posts", icon: "mdi:pencil" },
    { copy: "Books", url: "/settings/admin/content/books", icon: "mdi:book" },
    { copy: "Art", url: "/settings/admin/content/art", icon: "mdi:palette" }
  ];
</script>

<TabGroup
  active="variant-filled-primary"
  hover="hover:variant-soft-primary"
  flex="flex-1 lg:flex-none"
  rounded="rounded-sm"
  border=""
  class="w-full text-xl"
>
  {#each tabs as tab}
    <TabAnchor href={tab.url} selected={$page.url.pathname === tab.url}>
      <p class="flex flex-nowrap space-x-2 items-center">
        <Icon icon={tab.icon} class="w-6 h-6" />
        <span>{tab.copy}</span>
      </p>
    </TabAnchor>
  {/each}
</TabGroup>

<section class="p-4">
  <slot />
</section>
