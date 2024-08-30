<script lang="ts">
  import type { User } from "@prisma/client";
  export let users: User[] = [];
  $: columns = users[0] ? Object.keys(users[0]) : [];
</script>

<table class="table table-hover bg-transparent">
  <thead>
    <tr>
      {#each columns as column}
        <th>{column}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each users as user}
      <tr>
        {#each Object.values(user) as userProperty}
          <td>{userProperty}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
