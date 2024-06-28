<script lang="ts">
  import { Avatar, type PopupSettings, popup } from "@skeletonlabs/skeleton";

  type User = {
    username: string;
    avatar: string;
  };
  export let user: User;

  const profilePopup: PopupSettings = {
    // Represents the type of event that opens/closed the popup
    event: "click",
    // Matches the data-popup value on your popup element
    target: "profilePopup",
    // Defines which side of your trigger the popup will appear
    placement: "top"
  };
</script>

<div class={$$restProps.class}>
  <div class="card p-4 w-36 shadow-xl bg-white" data-popup="profilePopup">
    <div class="font-semibold text-right">
      <p>{user.username}</p>
      <a href="/me">View Profile</a>
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
