<script lang="ts">
  import type { ComponentType } from "svelte";
  import Writing from "./icons/Writing.svelte";
  import Album from "./icons/Album.svelte";
  import Palette from "./icons/Palette.svelte";
  import GameController from "./icons/GameController.svelte";
  type Link = {
    copy: string;
    url: string;
    description: string;
    class: string;
    iconColor: string;
    comingSoon?: boolean;
  };
  const links: Link[] = [
    {
      copy: "writing",
      url: "/blog",
      description: "brain juice, mostly",
      class: "lg:hover:text-yellow-500",
      iconColor: "text-yellow-500 opacity-75"
    },
    {
      copy: "listening",
      url: "/music",
      description: "totally radical tunes",
      class: "lg:hover:text-green-500",
      iconColor: "text-green-500 opacity-75"
    },
    {
      copy: "creating",
      url: "/art",
      description: "I like to make pretty things sometimes",
      class: "lg:hover:text-red-500",
      iconColor: "text-red-500 opacity-75"
    },
    {
      copy: "playing",
      url: "/games",
      description: "where my dreams become virtual reality",
      class: "lg:hover:text-blue-500",
      iconColor: "text-blue-500 opacity-75",
      comingSoon: true
    }
  ];
  const ICON_MIN_SIZE = 64;
  const ICON_MAX_SIZE = 128;
  $: outerWidth = 0;
  // Make the icons smaller on mobile
  const LG_BREAKPOINT = 1024;
  $: iconSize = outerWidth < LG_BREAKPOINT ? ICON_MIN_SIZE : ICON_MAX_SIZE;

  // A function for getting the appropriate icon based on the copy
  const getIcon = (copy: string): ComponentType => {
    switch (copy.toLowerCase()) {
      case "writing":
        return Writing;
      case "listening":
        return Album;
      case "creating":
        return Palette;
      case "playing":
        return GameController;
      default:
        throw new Error(`No icon found for copy: ${copy}`);
    }
  };
</script>

<svelte:window bind:outerWidth />
<section class={`grid lg:grid-cols-2 row-span-2 gap-20 ${$$restProps.class ?? ""}`}>
  {#each links as link}
    <div class={`text-center ${link.comingSoon ? "grayscale" : ""}`}>
      <a
        href={link.comingSoon ? "#" : link.url}
        class={`${
          link.comingSoon ? "text-black/50 dark:text-white/25" : "text-black dark:text-white"
        } text-2xl lg:text-5xl font-bold uppercase flex flex-nowrap space-x-2 leading-none items-center justify-center ${
          link.class
        }`}
      >
        <svelte:component
          this={getIcon(link.copy)}
          height={iconSize}
          width={iconSize}
          class={link.iconColor}
        />
        <span>{link.copy}</span>
      </a>
      <div class="flex flex-col mb-4">
        <p
          class={`text-lg italic ${
            link.comingSoon ? "text-black/50 dark:text-white/50" : "text-black dark:text-white/80"
          }`}
        >
          {link.description}
        </p>
        {#if link.comingSoon}
          <p class="text-lg uppercase text-white/25 font-semibold my-4">Coming Soon</p>
        {/if}
      </div>
    </div>
  {/each}
</section>
