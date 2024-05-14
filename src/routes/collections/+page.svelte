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
  const links = [
    {
      copy: "articles",
      url: "/blog",
      description: "brain juice, mostly",
      class: "hover:text-yellow-500",
      iconColor: "text-yellow-500 opacity-75",
      icon: "tabler:writing"
    },
    {
      copy: "music",
      url: "/collections/music",
      description: "totally radical tunes",
      class: "hover:text-green-500",
      iconColor: "text-green-500 opacity-75",
      icon: "material-symbols:album"
    },
    {
      copy: "games",
      url: "/collections/games",
      description: "where my dreams become virtual reality (uh oh)",
      class: "hover:text-blue-500",
      iconColor: "text-blue-500 opacity-75",
      icon: "f7:gamecontroller-fill",
      comingSoon: true
    },
    {
      copy: "art",
      url: "/collections/art",
      description: "I like to make pretty things sometimes",
      class: "hover:text-red-500",
      iconColor: "text-red-500 opacity-75",
      icon: "tabler:palette",
      comingSoon: true
    }
  ];
  const ICON_SIZE = 100;
</script>

<svelte:head>
  <title>treasure trash</title>
</svelte:head>

{#each links as link}
  <div class={`lg:col-span-3 text-center ${link.comingSoon ? "grayscale" : ""}`}>
    <a
      href={link.comingSoon ? "#" : link.url}
      class={`${
        link.comingSoon ? "text-gray-500" : "text-gray-900"
      } text-5xl font-bold uppercase flex flex-nowrap space-x-2 items-center justify-center ${
        link.class
      }`}
    >
      <Icon icon={link.icon} height={ICON_SIZE} width={ICON_SIZE} class={link.iconColor} />
      {link.copy}
    </a>
    <p class="text-sm text-gray-500">{link.description}</p>
    {#if link.comingSoon}
      <p class="text-lg uppercase text-gray-500 font-semibold my-4">Coming Soon</p>
    {/if}
  </div>
{/each}
