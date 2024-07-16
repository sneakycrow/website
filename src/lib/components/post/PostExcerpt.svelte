<script lang="ts">
  import PostCategory from "./PostCategory.svelte";
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

<div class="grid grid-cols-6 lg:items-center w-full">
  <header class="text-left lg:col-span-4 col-span-5">
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
  <article class="row-start-2 col-span-6 lg:col-span-4">
    <p class="text-lg italic text-gray-400">{post.summary}</p>
  </article>
  {#if post.draft ?? false}
    <p
      class="ml-auto text-error-300 text-xl uppercase font-semibold lg:col-start-5 lg:row-start-1 row-start-2 lg:col-span-1 col-span-2"
    >
      Draft
    </p>
  {/if}
  <PostCategory
    category={post.category}
    class="row-start-3 lg:row-start-1 col-span-2 lg:col-start-6 lg:ml-auto"
  />
</div>
