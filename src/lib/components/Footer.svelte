<script lang="ts">
  import ProfileMini from "$lib/components/ProfileMini.svelte";

  export let user: { username: string; avatar: string; } | undefined;
</script>

<footer class="bg-white mx-4 mb-4 p-2 flex flex-col">
  {#if user}
    <ProfileMini avatar={user.avatar} username={user.username} />
  {:else}
    <a href="/login">Login</a>
  {/if}
</footer>