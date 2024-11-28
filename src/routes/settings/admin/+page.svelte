<script lang="ts">
  import type { PageServerData } from "./$types";

  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();
  let users = $derived(data?.users ?? []);
</script>

<table class="table table-hover bg-transparent">
  <thead>
    <tr>
      <th>avatar</th>
      <th>id</th>
      <th>username</th>
      <th>email</th>
      <th>role</th>
    </tr>
  </thead>
  <tbody>
    {#each users as user}
      <tr>
        <td>
          <img src={user.avatar} class="w-8 rounded-full" alt={`Avatar for {user.username}`} />
        </td>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
      </tr>
    {/each}
  </tbody>
</table>
