<script>
  import { page } from "$app/state";
</script>

<div class="lg:col-span-6 row-span-2">
  <h1 class="text-4xl font-bold">Something went wrong</h1>
  <h2 class="text-xl">{page.status} {page.error?.message}</h2>
  <a href="/">Go back home</a>
</div>
