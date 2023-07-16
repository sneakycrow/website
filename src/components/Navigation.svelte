<script lang="ts">
  export let links = [
    {
      copy: "blog",
      url: "/blog"
    },
    {
      copy: "email me",
      url: "mailto:zach@sneakycrow.dev"
    }
  ];
</script>

<div class="p-6 bg-white flex flex-col justify-between items-end">
  {#each links as link, index}
    <a href={link.url} class="text-4xl my-4 text-center active:text-green-550 hover:text-green-550">
      <span class="text-2xl font-extrabold">
        <span class="relative text-black block">{link.copy}</span>
      </span>
    </a>
  {/each}
</div>
