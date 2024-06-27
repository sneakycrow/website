<script lang="ts">
  import Icon from "@iconify/svelte";

  type Link = {
    copy: string;
    url: string;
    hover: string;
  };
  export let additionalLinks: Link[] = [];
  export let links = [
    {
      copy: "blog",
      url: "/blog",
      hover: "lg:hover:text-green-500"
    },
    {
      copy: "books",
      url: "/books",
      hover: "lg:hover:text-red-500"
    },
    {
      copy: "music",
      url: "/music",
      hover: "lg:hover:text-orange-500"
    },
    {
      copy: "art",
      url: "/art",
      hover: "lg:hover:text-yellow-500"
    },
    {
      copy: "about",
      url: "/about",
      hover: "lg:hover:text-blue-500"
    }
  ];

  let isMobileOpen = false;
  const openMenu = () => {
    isMobileOpen = true;
  };

  const closeMenu = () => {
    isMobileOpen = false;
  };
</script>

<nav
  class={`w-full flex flex-col lg:flex-row lg:space-x-4 items-end justify-end ${$$restProps.class}`}
>
  <button class="lg:hidden" on:click={openMenu}>
    <Icon icon="mdi:hamburger-menu" class="inline-block w-12 h-12" />
  </button>
  {#each [...links, ...additionalLinks] as link}
    <a
      href={link.url}
      class={`text-black hidden lg:block lg:text-xl text-lg font-bold uppercase ${link.hover}`}
    >
      {link.copy}
    </a>
  {/each}
  {#if isMobileOpen}
    <div
      class="z-50 w-screen h-full bg-green-550 fixed top-0 left-0 flex flex-col items-end justify-center p-4"
    >
      <button class="mb-20" on:click={closeMenu}>
        <Icon
          icon="zondicons:close-solid"
          class="inline-block w-12 h-12 text-white active:text-red-500"
        />
      </button>
      {#each [...links, ...additionalLinks] as link}
        <a href={link.url} class={`text-white text-2xl font-bold uppercase`} on:click={closeMenu}>
          {link.copy}
        </a>
      {/each}
    </div>
  {/if}
</nav>
