<script lang="ts">
  import type { Category } from "$lib/posts";

  export let post: {
    slug: string;
    title: string;
    summary: string;
    date: string;
    category: Category;
    draft?: boolean;
  };

  const date = new Date(post.date ?? Date.now());
</script>

<div class="grid grid-cols-6 items-center w-full">
  <header class="row-start-1 text-left lg:col-span-4 col-span-6">
    <p class="text-xs italic text-gray-300">{date.toLocaleDateString()}</p>
    <a
      class={`lg:text-2xl text-xl font-bold uppercase ${
        post.draft ? "text-gray-500" : "text-black dark:text-white"
      } transition-opacity`}
      href={post.slug}
    >
      {post.title}
    </a>
  </header>
  <article class="row-start-2 row-span-2 col-span-4">
    <p class="text-lg italic text-gray-400">{post.summary}</p>
  </article>
  {#if post.draft ?? false}
    <p
      class="vertical-writing-rl lg:horizontal-writing-tb lg:ml-auto text-error-300 text-xl uppercase font-semibold lg:col-start-5 row-start-2 lg:row-span-2 lg:col-span-1 col-span-3"
    >
      Draft
    </p>
  {/if}
</div>
