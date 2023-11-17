<script lang="ts">
  import type { PageServerData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";
  import AboutMe from "$lib/components/AboutMe.svelte";
  import PostList from "$lib/components/PostList.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { enhance } from "$app/forms";

  export let data: PageServerData;
</script>

<main class="flex flex-col space-y-4 p-4 min-h-screen max-w-full">
  <Header subtitle="software wizard" title="Sneaky Crow" />
  <BannerLinks />
  {#if data.posts?.length > 0}
    <PostList posts={data.posts} title="Recent Posts" cols="grid-cols-2" />
  {/if}
  <AboutMe />
  <Footer>
    <div class="flex flex-col space-y-2" slot="left">
      <span class="text-sm">© {new Date().getFullYear()} Sneaky Crow, LLC</span>
      <span class="text-sm">All Rights Reserved</span>
    </div>
    <div class="flex flex-col space-y-2" slot="right">
      {#if data.username}
        <p class="text-sm">Logged in as <span class="font-bold">{data.username}</span></p>
        <form action="/?/logout" method="post" use:enhance>
          <input class="w-full block text-left cursor-pointer text-green-550 font-bold" type="submit"
                 value="Log Out" />
        </form>
      {:else}
        <a class="w-full block text-left cursor-pointer hover:text-cobrashare-green-6" href="/login">Log In</a>
      {/if}
    </div>
  </Footer>
</main>