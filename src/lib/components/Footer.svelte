<script lang="ts">
  import Avatar from "./AvatarWidget.svelte";

  type User = {
    username: string;
    avatar: string;
  };
  export let user: User | null = null;
</script>

<footer class={`py-4 flex justify-between items-center ${$$restProps.class}`}>
  <p>
    <span class="text-sm">© {new Date().getFullYear()} Sneaky Crow, LLC</span>
    <span class="text-sm">All Rights Reserved</span>
  </p>
  {#if user}
    <Avatar {user} />
  {:else}
    <a href="/login">Login</a>
  {/if}
</footer>
