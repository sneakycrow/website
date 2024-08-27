<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  $: users = data?.users ?? [];
</script>

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
