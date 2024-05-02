<script>
  import Icon from "@iconify/svelte";
  import Logo from "$lib/components/Logo.svelte";
</script>

<svelte:head>
  <title>login - sneaky crow</title>
</svelte:head>

<section class="flex col-span-6 justify-center items-center flex-col space-y-4">
  <Logo />
  <h1 class="text-xl drop-shadow-md font-bold">Sign in</h1>
  <a
    class="flex flex-nowrap text-black items-center justify-between border-black border-4 rounded-lg px-4 py-2 drop-shadow-md bg-white hover:shadow-xl transition-shadow"
    href="/login/github"
  >
    Sign in with Github
    <Icon class="ml-2" icon="mdi:github" width={24} />
  </a>
</section>
