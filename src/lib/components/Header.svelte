<script lang="ts">
  import Logo from "./Logo.svelte";
  import Navigation from "./Navigation.svelte";

  export let title: string;
  export let link: string = "/";
  type User = {
    username: string;
    avatar: string;
  };
  export let user: User | null = null;

  const authLinks = [
    {
      copy: "Dashboard",
      url: "/dashboard",
      hover: "hover:text-purple-500"
    }
  ];
</script>

<header
  class={`w-full grid grid-flow-dense grid-cols-3 gap-10 lg:grid-rows-3 items-center justify-between lg:max-h-[300px] ${$$restProps.class}`}
>
  <Logo class="row-start-1 py-4 row-span-2 col-start-1 col-span-1 lg:ml-0 w-[100px] lg:w-[200px]" />
  <Navigation
    class="w-full lg:row-start-1 row-start-2 col-start-2 col-span-2"
    additionalLinks={user ? authLinks : []}
  />
  <section
    class="lg:col-start-2 col-start-1 lg:col-span-2 col-span-3 row-start-3 lg:row-start-2 flex justify-end"
  >
    <a href={link} class="text-black hover:text-green-550">
      <h1 class="text-xl lg:text-5xl font-bold uppercase">{title}</h1>
    </a>
  </section>
</header>
