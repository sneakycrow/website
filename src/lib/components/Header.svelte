<script lang="ts">
  import Logo from "./Logo.svelte";
  import Navigation from "./Navigation.svelte";

  export let title: string;
  export let link: string = "/";
</script>

<header
  class={`w-full grid grid-cols-3 grid-rows-2 items-center justify-between max-h-[200px] ${$$restProps.class}`}
>
  <Logo class="row-start-1 row-span-2 col-start-1 w-[200px] place-self-center justify-self-start" />
  <Navigation class="w-full row-start-1 col-start-2 col-span-2" />
  <section class="col-start-2 col-span-2 row-start-2 flex justify-end">
    <a href={link} class="text-black hover:text-green-550">
      <h1 class="text-5xl font-bold uppercase">{title}</h1>
    </a>
  </section>
</header>
