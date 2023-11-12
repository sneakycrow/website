<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import BannerLinks from "$lib/components/BannerLinks.svelte";
  import AboutMe from "$lib/components/AboutMe.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import ProjectList from "$lib/components/ProjectList.svelte";

  export let user: { username: string; avatar: string; } | undefined;
</script>

<main class="flex flex-col space-y-4 p-4 min-h-screen max-w-full">
  <Header subtitle="software wizard" title="Sneaky Crow" />
  <BannerLinks />
  <AboutMe />
  <ProjectList />
  <Footer>
    <p class="text-gray-400 text-xs" slot="left">I actively work on both for-fun and for-profit projects, so please
      reach out via email if you're interested in
      working together!</p>
    <ul class="text-gray-600" slot="right">
      <li>
        <a class="text-gray-400 font-normal" href="/login">Login</a>
      </li>
    </ul>
  </Footer>
</main>
