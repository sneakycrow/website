<script lang="ts">
  import { page } from "$app/stores";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  const tabs = [
    {
      copy: "Top Artists",
      href: "/art/music/top-artists"
    },
    {
      copy: "Recent Tracks",
      href: "/art/music/recent-tracks"
    }
  ];
</script>

<section class="lg:col-span-6 row-start-2 row-span-2 grid lg:grid-cols-3 gap-10">
  <div class="lg:col-span-3 grid lg:grid-cols-2 text-center">
    {#each tabs as tab}
      <a
        class={`text-xl uppercase font-bold ${
          $page.url.pathname.startsWith(tab.href) ? "text-primary-500" : "text-primary-700/50"
        }`}
        href={tab.href}>{tab.copy}</a
      >
    {/each}
  </div>
  {@render children?.()}
</section>
