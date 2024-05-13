<script lang="ts">
  import Icon from "@iconify/svelte";

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
    }
  ];
  const ICON_SIZE = 100;
</script>

<svelte:head>
  <title>treasure trash</title>
</svelte:head>

{#each links as link}
  <div class="lg:col-span-3 text-center">
    <a
      href={link.url}
      class={`text-gray-900 lg:text-5xl font-bold uppercase flex flex-nowrap space-x-2 items-center justify-center ${link.class}`}
    >
      <Icon icon={link.icon} height={ICON_SIZE} width={ICON_SIZE} class={link.iconColor} />
      {link.copy}
    </a>
    <p class="text-sm text-gray-500">{link.description}</p>
  </div>
{/each}
