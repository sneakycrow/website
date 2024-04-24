<script lang="ts">
  import Icon from "@iconify/svelte";

  const ICON_SIZE = 36;

  export let links = [
    {
      copy: "github",
      url: "https://github.com/sneakycrow",
      icon: "prime:github"
    },
    {
      copy: "mastadon",
      url: "https://social.lol/@sneakycrow",
      icon: "mdi:mastodon"
    },
    {
      copy: "resume",
      url: "/resume.pdf",
      icon: "tabler:id"
    },
    {
      copy: "contact",
      url: "mailto:zach@sneakycrow.dev",
      icon: "mingcute:send-line"
    }
  ];
</script>

<div class="flex justify-center w-full">
  <nav class="py-2 w-full flex flex-col justify-between xl:flex-row items-center max-w-[1000px]">
    {#each links as link, index}
      <a
        href={link.url}
        {...link}
        target="_blank"
        class="text-lg font-bold text-green-550 opacity-50 hover:opacity-100 transition-opacity"
      >
        <span class="flex flex-row items-center">
          <Icon icon={link.icon} height={ICON_SIZE} />
          <span class="ml-2">{link.copy}</span>
        </span>
      </a>
    {/each}
  </nav>
</div>
