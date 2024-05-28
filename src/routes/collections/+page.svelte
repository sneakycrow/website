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
      class: "hover:text-yellow-500",
      iconColor: "text-yellow-500 opacity-75",
      icon: "tabler:writing"
    },
    {
      copy: "listening",
      url: "/music",
      description: "totally radical tunes",
      class: "hover:text-green-500",
      iconColor: "text-green-500 opacity-75",
      icon: "material-symbols:album"
    },
    {
      copy: "reading",
      url: "/music",
      description: "feeding my brain with the written word",
      class: "hover:text-purple-500",
      iconColor: "text-purple-500 opacity-75",
      icon: "tabler:book",
      comingSoon: true
    },
    {
      copy: "playing",
      url: "/games",
      description: "where my dreams become virtual reality (uh oh)",
      class: "hover:text-blue-500",
      iconColor: "text-blue-500 opacity-75",
      icon: "f7:gamecontroller-fill",
      comingSoon: true
    },
    {
      copy: "creating",
      url: "/art",
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

<section class="grid lg:grid-cols-2 lg:col-span-6 row-span-2 gap-8">
  {#each links as link}
    <div class={`text-center ${link.comingSoon ? "grayscale" : ""}`}>
      <a
        href={link.comingSoon ? "#" : link.url}
        class={`${
          link.comingSoon ? "text-gray-500" : "text-gray-900"
        } text-xl lg:text-5xl font-bold uppercase flex flex-nowrap space-x-2 leading-none items-center justify-center ${
          link.class
        }`}
      >
        <Icon icon={link.icon} height={ICON_SIZE} width={ICON_SIZE} class={link.iconColor} />
        {link.copy}
      </a>
      <p class="lg:text-sm text-gray-500 mb-4">{link.description}</p>
      {#if link.comingSoon}
        <p class="text-lg uppercase text-gray-500 font-semibold my-4">Coming Soon</p>
      {/if}
    </div>
  {/each}
</section>
