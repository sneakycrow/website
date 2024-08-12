<script lang="ts">
  import { page } from "$app/stores";

  const activeLinks = [
    {
      copy: "music",
      href: "/art/music",
      color: "text-purple-500"
    },
    {
      copy: "photos",
      href: "/art/photos",
      color: "text-blue-500"
    }
  ];
</script>

<nav
  class="row-start-2 w-full text-center lg:text-left lg:col-span-1 lg:col-start-6 flex flex-col space-y-8 lg:sticky top-0"
>
  {#each activeLinks as link}
    <a
      href={link.href}
      class={`text-2xl uppercase font-bold ${
        $page.url.pathname.startsWith(link.href) ? link.color : "text-gray-500"
      }`}>{link.copy}</a
    >
  {/each}
</nav>

<section class="lg:row-start-2 row-start-3 lg:col-span-5 w-full">
  <slot />
</section>
