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
    subPages?: {
      copy: string;
      url: string;
      class?: string;
    }[];
  };
  const links: Link[] = [
    {
      copy: "writing",
      url: "/blog",
      description: "brain juice, mostly",
      class: "hover:text-yellow-500",
      iconColor: "text-yellow-500 opacity-75",
      icon: "tabler:writing",
      subPages: [
        {
          copy: "blog",
          url: "/blog",
          class: "border-yellow-500 border-b-4"
        },
        {
          copy: "poetry",
          url: "#",
          class: "opacity-25 hover:opacity-25 cursor-not-allowed"
        }
      ]
    },
    {
      copy: "music",
      url: "/music",
      description: "totally radical tunes",
      class: "hover:text-green-500",
      iconColor: "text-green-500 opacity-75",
      icon: "material-symbols:album",
      subPages: [
        {
          copy: "top artists",
          url: "/music",
          class: "border-green-500 border-b-4"
        },
        {
          copy: "self-published",
          url: "#",
          class: "opacity-25 hover:opacity-25 cursor-not-allowed"
        }
      ]
    },
    {
      copy: "games",
      url: "/games",
      description: "where my dreams become virtual reality (uh oh)",
      class: "hover:text-blue-500",
      iconColor: "text-blue-500 opacity-75",
      icon: "f7:gamecontroller-fill",
      comingSoon: true,
      subPages: [
        {
          copy: "self-made",
          url: "#",
          class: "opacity-25 hover:opacity-25 cursor-not-allowed"
        },
        {
          copy: "reviews",
          url: "#",
          class: "opacity-25 hover:opacity-25 cursor-not-allowed"
        }
      ]
    },
    {
      copy: "art",
      url: "/art",
      description: "I like to make pretty things sometimes",
      class: "hover:text-red-500",
      iconColor: "text-red-500 opacity-75",
      icon: "tabler:palette",
      comingSoon: true,
      subPages: [
        {
          copy: "digital",
          url: "#",
          class: "opacity-25 hover:opacity-25 cursor-not-allowed"
        },
        {
          copy: "generative",
          url: "#",
          class: "opacity-25 hover:opacity-25 cursor-not-allowed"
        },
        {
          copy: "photography",
          url: "#",
          class: "opacity-25 hover:opacity-25 cursor-not-allowed"
        }
      ]
    }
  ];
  const ICON_SIZE = 100;
</script>

<svelte:head>
  <title>treasure trash</title>
</svelte:head>

{#each links as link}
  <div class={`lg:col-span-3 text-center gap-8 ${link.comingSoon ? "grayscale" : ""}`}>
    <a
      href={link.comingSoon ? "#" : link.url}
      class={`${
        link.comingSoon ? "text-gray-500" : "text-gray-900"
      } text-5xl font-bold uppercase flex flex-nowrap space-x-2 leading-none items-center justify-center ${
        link.class
      }`}
    >
      <Icon icon={link.icon} height={ICON_SIZE} width={ICON_SIZE} class={link.iconColor} />
      {link.copy}
    </a>
    <!-- {#if link.subPages}
      <div class="flex gap-4 text-center items-center justify-center my-4">
        {#each link.subPages as subpage}
          <a href={subpage.url} class={`text-black ${subpage.class}`}>{subpage.copy}</a>
        {/each}
      </div>
    {/if} -->
    <p class="text-sm text-gray-500">{link.description}</p>
    {#if link.comingSoon}
      <p class="text-lg uppercase text-gray-500 font-semibold my-4">Coming Soon</p>
    {/if}
  </div>
{/each}
