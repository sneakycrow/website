<script lang="ts">
  type Link = {
    copy: string;
    url: string;
    hover: string;
  };
  export let additionalLinks: Link[] = [];
  export let links = [
    {
      copy: "blog",
      url: "/blog",
      hover: "hover:text-red-500"
    },
    {
      copy: "about",
      url: "/#about",
      hover: "hover:text-blue-500"
    },
    {
      copy: "projects",
      url: "/#projects",
      hover: "hover:text-yellow-500"
    }
  ];
</script>

<div class={`w-full flex space-x-4 justify-end ${$$restProps.class}`}>
  {#each [...links, ...additionalLinks] as link}
    <a
      href={link.url}
      class={`text-black block lg:text-xl text-lg font-bold uppercase ${link.hover}`}
    >
      {link.copy}
    </a>
  {/each}
</div>
