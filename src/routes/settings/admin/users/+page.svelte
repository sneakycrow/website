<script lang="ts">
  import UserList from "$lib/components/UserList.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  $: users = data?.users ?? [];
</script>

<section class="flex flex-col w-full space-y-4">
  <h3 class="text-2xl">Manage Users</h3>
  <UserList {users} />
</section>
