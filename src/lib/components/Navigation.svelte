<script lang="ts">
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
    }
  ];
</script>

<div class={`w-full flex space-x-4 justify-end ${$$restProps.class}`}>
  {#each links as link, index}
    <a
      href={link.url}
      class={`text-black block lg:text-xl text-lg font-bold uppercase ${link.hover}`}
    >
      {link.copy}
    </a>
  {/each}
</div>
