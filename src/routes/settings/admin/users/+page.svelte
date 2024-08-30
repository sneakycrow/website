<script lang="ts">
  import UserList from "$lib/components/UserList.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  $: users = data?.users ?? [];
</script>

<UserList {users} />
