<script lang="ts">
  import Close from "./icons/Close.svelte";
  import Hamburger from "./icons/Hamburger.svelte";

  type Link = {
    copy: string;
    url: string;
    hover: string;
  };
  interface Props {
    additionalLinks?: Link[];
    links?: Link[];
    class?: string;
  }

  let {
    additionalLinks = [],
    links = [
      {
        copy: "blog",
        url: "/blog",
        hover: "lg:hover:text-yellow-500"
      }
    ],
    class: className
  }: Props = $props();

  let isMobileOpen = $state(false);
  const openMenu = () => {
    isMobileOpen = true;
  };

  const closeMenu = () => {
    isMobileOpen = false;
  };
</script>

<nav class={`w-full flex flex-col lg:flex-row lg:space-x-4 items-end justify-end ${className}`}>
  <button class="lg:hidden" onclick={openMenu}>
    <Hamburger class="inline-block w-12 h-12" />
  </button>
  {#each [...links, ...additionalLinks] as link}
    <a
      href={link.url}
      class={`text-black dark:text-white hidden lg:block lg:text-xl text-lg font-bold uppercase ${link.hover}`}
    >
      {link.copy}
    </a>
  {/each}
  {#if isMobileOpen}
    <div
      class="z-50 w-screen h-full bg-primary-500 fixed top-0 left-0 flex flex-col items-end justify-start p-4"
    >
      <button class="mb-20" onclick={closeMenu}>
        <Close class="inline-block w-12 h-12 text-white active:text-red-500" />
      </button>
      {#each [...links, ...additionalLinks] as link}
        <a href={link.url} class={`text-white text-2xl font-bold uppercase`} onclick={closeMenu}>
          {link.copy}
        </a>
      {/each}
    </div>
  {/if}
</nav>
