<script lang="ts">
  import { Avatar, type PopupSettings, popup } from "@skeletonlabs/skeleton";

  type User = {
    username: string;
    avatar: string;
  };

  interface Props {
    user: User;
    links?: { copy: string; url: string }[];
    class?: string;
  }

  let { user, links = [], class: className }: Props = $props();

  const profilePopup: PopupSettings = {
    // Represents the type of event that opens/closed the popup
    event: "click",
    // Matches the data-popup value on your popup element
    target: "profilePopup",
    // Defines which side of your trigger the popup will appear
    placement: "top"
  };
</script>

<div class={className}>
  <div class="card p-4 w-36 shadow-xl bg-white" data-popup="profilePopup">
    <div
      class="font-semibold text-right flex flex-col space-y-2 divide-y-2 divide-surface-500 justify-end"
    >
      <p>{user.username}</p>
      <div class="flex flex-col">
        {#each links as link}
          <a href={link.url} class="text-lg">{link.copy}</a>
        {/each}
      </div>
      <form action="/?/logout" method="post">
        <button class="cursor-pointer font-semibold hover:text-red-500 text-gray-400" type="submit"
          >Log Out</button
        >
      </form>
    </div>
  </div>
  <button use:popup={profilePopup}>
    <Avatar width="w-[50px]" rounded="rounded-full" src={user.avatar} />
  </button>
</div>
