<script lang="ts">
  import "../app.css";
  import type { LayoutServerData } from "./$types";
  import Footer from "$lib/components/Footer.svelte";

  export let data: LayoutServerData;

  let user: { username: string, avatar: string } | undefined;
  $: if (data.username && data.avatar) {
    user = {
      username: data.username,
      avatar: data.avatar
    };
  }
</script>

<slot />

<Footer {user} />

