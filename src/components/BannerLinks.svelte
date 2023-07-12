<script lang="ts">
  import Icon from "@iconify/svelte";

  const ICON_SIZE = 48;

  export let links = [
    {
      copy: "github",
      url: "https://github.com/sneakycrow",
      icon: "ri:github-line"
    },
    {
      copy: "resume",
      url: "/resume.pdf",
      icon: "ri:briefcase-2-line"
    },
    {
      copy: "mastodon",
      url: "https://cybre.gg/@squid",
      rel: "me",
      icon: "ri:mastodon-line"
    }
  ];
</script>

<nav class="bg-white p-4 w-full flex flex-col justify-evenly xl:flex-row items-center">
  {#each links as link, index}
    <a
      href={link.url}
      {...link}
      class="text-xl font-bold text-green-550 opacity-50 hover:opacity-100 transition-opacity"
    >
      <span class="flex flex-row items-center">
        <Icon icon={link.icon} size={ICON_SIZE} />
        <span class="ml-2">{link.copy}</span>
      </span>
    </a>
  {/each}
</nav>
