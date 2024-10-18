<script lang="ts">
  import Discord from "$lib/components/icons/Discord.svelte";
  import GitHub from "$lib/components/icons/GitHub.svelte";
  import Spotify from "$lib/components/icons/Spotify.svelte";
  import Twitch from "$lib/components/icons/Twitch.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import { type ComponentType } from "svelte";

  type ProviderSignIn = {
    icon: ComponentType;
    textColor: string;
    border: string;
    copy: string;
    href: string;
  };

  const providers: ProviderSignIn[] = [
    {
      icon: Discord,
      copy: "Sign in with Discord",
      textColor: "text-[#5865F2]",
      border: "border-[#5865F2]",
      href: "/login/discord"
    },
    {
      icon: GitHub,
      copy: "Sign in with Github",
      textColor: "text-[#24292f]",
      border: "border-[#24292f]",
      href: "/login/github"
    },
    {
      icon: Spotify,
      copy: "Sign in with Spotify",
      textColor: "text-[#1DB954]",
      border: "border-[#1DB954]",
      href: "/login/spotify"
    },
    {
      icon: Twitch,
      copy: "Sign in with Twitch",
      textColor: "text-[#9146FF]",
      border: "border-[#9146FF]",
      href: "/login/twitch"
    }
  ];
</script>

<svelte:head>
  <title>login - sneaky crow</title>
</svelte:head>

<section class="flex lg:col-span-6 justify-center items-center flex-col space-y-4">
  <h1 class="text-xl drop-shadow-md font-bold">Sign in</h1>
  {#each providers as provider}
    <a
      class="flex flex-nowrap items-center justify-between {provider.textColor} {provider.border} border-4 rounded-lg px-4 py-2 drop-shadow-md bg-white hover:shadow-xl transition-shadow"
      href={provider.href}
    >
      {provider.copy}
      <svelte:component this={provider.icon} class="ml-2" width={24} />
    </a>
  {/each}
</section>
