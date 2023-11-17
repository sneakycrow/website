<script lang="ts">
  export let links = [
    {
      copy: "blog",
      url: "/blog"
    },
    {
      copy: "about",
      url: "/#about"
    }
  ];
</script>

<div class="p-6 bg-white flex flex-col justify-evenly items-center lg:items-end">
  {#each links as link, index}
    <a href={link.url} class="my-4 text-center active:text-green-550 hover:text-green-550">
      <span class="text-2xl font-extrabold">
        <span class="relative text-black block">{link.copy}</span>
      </span>
    </a>
  {/each}
</div>
