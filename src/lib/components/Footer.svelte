<script lang="ts">
  import AvatarWidget from "./AvatarWidget.svelte";
  import GitHub from "./icons/GitHub.svelte";

  type User = {
    username: string;
    avatar: string;
    role?: string;
  };
  export let user: User | null = null;
  const links = [{ copy: "settings", url: "/settings" }];
</script>

<footer
  class={`py-4 flex flex-col lg:flex-row justify-between items-end z-10 ${$$restProps.class}`}
>
  <p class="flex flex-col">
    <span class="text-sm">© {new Date().getFullYear()} Sneaky Crow, LLC</span>
    <span class="text-sm">All Rights Reserved</span>
    <a
      class="font-semibold flex items-center space-x-2"
      href="https://github.com/sneakycrow/website"
      target="_blank"
    >
      <span>source code for this site</span>
      <GitHub class="inline-block w-4 h-4" />
    </a>
  </p>
  {#if user}
    <AvatarWidget {user} {links} />
  {:else}
    <a href="/login">Login</a>
  {/if}
</footer>
