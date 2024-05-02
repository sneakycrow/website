<script lang="ts">
  import { enhance } from "$app/forms";

  export let username: string;
  export let avatar: string;
</script>

<div class="flex flex-nowrap items-center justify-center space-x-4">
  <img alt="avatar" class="rounded-full w-10" src={avatar} />
  <form action="/?/logout" method="post" use:enhance>
    <input class="hover:text-red-500 cursor-pointer" type="submit" value="Log Out" />
  </form>
</div>
