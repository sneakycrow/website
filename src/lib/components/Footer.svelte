<script lang="ts">
  import Icon from "@iconify/svelte";
  import AvatarWidget from "./AvatarWidget.svelte";

  type User = {
    username: string;
    avatar: string;
    role?: string;
  };
  export let user: User | null = null;
  const links = [{ copy: "settings", url: "/settings" }];
</script>

<footer
  class={`py-4 flex flex-col space-y-10 lg:flex-row justify-between items-center z-10 ${$$restProps.class}`}
>
  <p class="flex flex-col">
    <span class="text-sm">© {new Date().getFullYear()} Sneaky Crow, LLC</span>
    <span class="text-sm">All Rights Reserved</span>
    <a
      class="text-gray-500 font-normal flex items-center space-x-2"
      href="https://github.com/sneakycrow/website"
    >
      <span>source code for this site</span>
      <Icon icon="akar-icons:github-fill" class="inline-block w-4 h-4" />
    </a>
    <a href="mailto:zach@sneakycrow.dev">contact me</a>
  </p>
  {#if user}
    <AvatarWidget {user} {links} />
  {:else}
    <a href="/login">Login</a>
  {/if}
</footer>
