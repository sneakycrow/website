<script lang="ts">
  import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import type { PageServerData } from "./$types";

  let valueSingle = "accounts";

  export let data: PageServerData;
  const users =
    data.users?.map((u) => ({
      role: u.role,
      username: u.username,
      email: u.email
    })) ?? [];
</script>

<ListBox class="lg:col-span-1">
  <ListBoxItem
    bind:group={valueSingle}
    active="variant-filled-primary"
    name="accounts"
    value="accounts"
  >
    <svelte:fragment slot="lead">
      <Icon
        icon="mdi:account"
        class={`${
          valueSingle === "accounts"
            ? "text-white"
            : "text-black dark:text-white"
        } w-6 h-6`}
      />
    </svelte:fragment>
    <a
      href="/admin/accounts"
      class="text-black dark:text-white"
      class:text-white={valueSingle === "accounts"}>Accounts</a
    >
  </ListBoxItem>
  <ListBoxItem
    bind:group={valueSingle}
    active="variant-filled-primary"
    name="posts"
    value="posts"
    disabled
  >
    <svelte:fragment slot="lead">
      <Icon
        icon="mdi:file-document-outline"
        class={`${
          valueSingle === "posts" ? "text-white" : "text-black dark:text-white"
        } w-6 h-6`}
      />
    </svelte:fragment>
    Feed Manager
  </ListBoxItem>
</ListBox>

<div class="table-container lg:col-span-5">
  <!-- Native Table Element -->
  <table class="table table-hover bg-transparent">
    <thead>
      <tr>
        {#each Object.keys(users[0]) as key}
          <th>{key}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
          {#each Object.values(user) as value}
            <td>{value}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
