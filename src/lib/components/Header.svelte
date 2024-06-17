<script lang="ts">
  import Logo from "./Logo.svelte";
  import Navigation from "./Navigation.svelte";

  export let title: string;
  export let link: string = "/";
  export let isLive = false;
  type User = {
    username: string;
    avatar: string;
  };
  export let user: User | null = null;

  const authLinks = [
    {
      copy: "Dashboard",
      url: "/dashboard",
      hover: "hover:text-purple-500"
    }
  ];
</script>

<header
  class={`w-full grid grid-flow-dense grid-cols-3 lg:grid-rows-3 items-center justify-between lg:max-h-[300px] ${$$restProps.class}`}
>
  <Logo class="row-start-1 row-span-2 py-4 col-start-1 col-span-1 lg:ml-0 w-[100px] lg:w-[200px]" />
  <Navigation
    class="row-start-1 row-span-2 lg:row-span-1 w-full col-start-2 col-span-2 items-start justify-start"
    additionalLinks={user ? authLinks : []}
  />
  <section
    class="lg:col-start-2 col-start-1 lg:col-span-2 col-span-3 row-start-3 lg:row-start-2 flex justify-end items-end flex-col"
  >
    <a href={link} class="text-black hover:text-green-550 flex flex-col justify-start">
      <h1 class="text-xl lg:text-5xl font-bold uppercase">{title}</h1>
    </a>
    {#if isLive}
      <div class="flex flex-nowrap items-center animate-pulse">
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
</header>
