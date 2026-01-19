<script lang="ts">
  import GitHub from "./icons/GitHub.svelte";
  import BlueSky from "./icons/BlueSky.svelte";
  import Email from "./icons/Email.svelte";

  interface Props {
    children?: import("svelte").Snippet;
    networks?: Network[];
    withDefault?: boolean;
    showCopy?: boolean;
  }

  let { networks = [], withDefault = true, showCopy = true }: Props = $props();

  type Network = "github" | "bluesky" | "email";

  const defaultNetworks: Network[] = ["github", "email"];
  const networks_lookup = {
    github: {
      link: "https://github.com/sneakycrow",
      icon: GitHub,
      copy: "GitHub"
    },
    bluesky: {
      link: "https://sneakycrow.bsky.social",
      icon: BlueSky,
      copy: "BlueSky"
    },
    email: {
      link: "mailto:zach@sneakycrow.dev",
      icon: Email,
      copy: "Email"
    }
  };

  let baseNetworks = $derived(withDefault ? defaultNetworks : []);

  const allNetworks = $derived(
    [...baseNetworks, ...networks].map((network) => networks_lookup[network])
  );
</script>

<div class="flex flex-row gap-8">
  {#each allNetworks as { link, icon: Icon, copy }}
    <a
      href={link}
      class="flex flex-nowrap items-center gap-2 transition-opacity text-white dark:tex-white opacity-60 hover:opacity-100 dark:t-white hover:text-white dark:hover:text-white"
      target="_blank"
    >
      <div class="text-xl">
        <Icon />
      </div>
      {#if showCopy}
        <span>{copy}</span>
      {/if}
    </a>
  {/each}
</div>
