<script lang="ts">
  import { page } from "$app/stores";
  import { TabGroup, TabAnchor } from "@skeletonlabs/skeleton";

  const tabs = [
    { copy: "Posts", url: "/settings/admin/content/posts" },
    { copy: "Books", url: "/settings/admin/content/books" }
  ];
</script>

<TabGroup>
  {#each tabs as tab}
    <TabAnchor href={tab.url} selected={$page.url.pathname === tab.url}>
      {tab.copy}
    </TabAnchor>
  {/each}
</TabGroup>

<slot />
