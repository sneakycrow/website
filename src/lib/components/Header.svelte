<script lang="ts">
  import Logo from "./Logo.svelte";
  import Navigation from "./Navigation.svelte";
  import AvatarWidget from "./AvatarWidget.svelte";

  type User = {
    username: string;
    avatar: string;
    role?: string;
  };
  interface Props {
    title: string;
    link?: string;
    isLive?: boolean;
    user?: User | null;
    class?: string;
  }

  let { title, link = "/", isLive = true, user = null, class: className }: Props = $props();
  const links = [
    { copy: "upload", url: "/upload" },
    { copy: "admin", url: "/settings/admin" },
    { copy: "settings", url: "/settings" }
  ];
</script>

<header
  class={`w-full grid grid-cols-header items-center lg:items-start lg:max-h-[300px] z-20 lg:mb-10 ${className}`}
>
  <Logo class="w-14 lg:w-[100px] col-start-1 col-span-1" />
  <section
    class="flex-grow-0 row-start-2 lg:row-start-1 col-start-1 lg:col-start-2 col-span-6 lg:col-span-3 flex lg:flex-row flex-col justify-center items-center lg:items-start lg:justify-start lg:mt-0 mt-4"
  >
    <a href={link} class="max-w-max block text-black dark:text-white lg:hover:text-primary-500">
      <h1 class="text-xl lg:text-3xl font-bold uppercase">{title}</h1>
    </a>
    {#if isLive}
      <div
        class="flex flex-nowrap items-center justify-center lg:justify-start animate-pulse self-center"
      >
        <svg
          class="w-4 h-4 mr-2 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="10" />
        </svg>
        <a
          href="https://twitch.tv/thesneakycrow"
          class="text-red-500 uppercase font-bold"
          target="_blank">Live now!</a
        >
      </div>
    {/if}
  </section>
  <section class="w-full col-start-5 col-span-2 text-right flex items-center space-x-8">
    <Navigation />
    {#if user}
      <AvatarWidget {user} {links} />
    {/if}
  </section>
</header>
