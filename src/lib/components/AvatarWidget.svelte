<script lang="ts">
  import Icon from "@iconify/svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { enhance } from "$app/forms";

  type User = {
    username: string;
    avatar: string;
  };
  export let user: User;
  export let isExpanded: boolean = false;

  const toggleExpanded = () => {
    isExpanded = !isExpanded;
  };

  const expandedMenu = [
    {
      href: "/dashboard",
      text: "Dashboard"
    },
    {
      href: "/?logout",
      text: "Logout"
    }
  ];
</script>

<div class={`flex gap-2 items-end justify-center ${$$restProps.class}`}>
  <img
    src={user.avatar}
    alt={`Avatar for ${user.username}`}
    height={50}
    width={50}
    class="rounded-full"
  />
  <div class="flex flex-col items-end text-right justify-center font-semibold">
    <p>{user.username}</p>
    <form action="/?/logout" method="post">
      <button class="cursor-pointer font-semibold hover:text-red-500 text-gray-400" type="submit"
        >Log Out</button
      >
    </form>
  </div>
</div>
