<script lang="ts">
  import Icon from "@iconify/svelte";
  type Link = {
    copy: string;
    url: string;
    description: string;
    class: string;
    iconColor: string;
    icon: string;
    comingSoon?: boolean;
  };
  const links: Link[] = [
    {
      copy: "writing",
      url: "/blog",
      description: "brain juice, mostly",
      class: "lg:hover:text-yellow-500",
      iconColor: "text-yellow-500 opacity-75",
      icon: "tabler:writing"
    },
    {
      copy: "listening",
      url: "/music",
      description: "totally radical tunes",
      class: "lg:hover:text-green-500",
      iconColor: "text-green-500 opacity-75",
      icon: "material-symbols:album"
    },
    {
      copy: "creating",
      url: "/art",
      description: "I like to make pretty things sometimes",
      class: "lg:hover:text-red-500",
      iconColor: "text-red-500 opacity-75",
      icon: "tabler:palette"
    },
    {
      copy: "playing",
      url: "/games",
      description: "where my dreams become virtual reality",
      class: "lg:hover:text-blue-500",
      iconColor: "text-blue-500 opacity-75",
      icon: "f7:gamecontroller-fill",
      comingSoon: true
    }
  ];
  const ICON_MIN_SIZE = 64;
  const ICON_MAX_SIZE = 128;
  $: outerWidth = 0;
  // Make the icons smaller on mobile
  const LG_BREAKPOINT = 1024;
  $: iconSize = outerWidth < LG_BREAKPOINT ? ICON_MIN_SIZE : ICON_MAX_SIZE;
</script>

<svelte:window bind:outerWidth />
<section class={`grid lg:grid-cols-2 row-span-2 gap-20 ${$$restProps.class ?? ""}`}>
  {#each links as link}
    <div class={`text-center ${link.comingSoon ? "grayscale" : ""}`}>
      <a
        href={link.comingSoon ? "#" : link.url}
        class={`${
          link.comingSoon ? "text-gray-500 dark:text-gray-300" : "text-black dark:text-white"
        } text-2xl lg:text-5xl font-bold uppercase flex flex-nowrap space-x-2 leading-none items-center justify-center ${
          link.class
        }`}
      >
        <Icon icon={link.icon} height={iconSize} width={iconSize} class={link.iconColor} />
        <span>{link.copy}</span>
      </a>
      <div class="flex flex-col mb-4">
        <p class="text-lg text-black dark:text-white">{link.description}</p>
        {#if link.comingSoon}
          <p class="text-lg uppercase text-gray-500 font-semibold my-4">Coming Soon</p>
        {/if}
      </div>
    </div>
  {/each}
</section>
