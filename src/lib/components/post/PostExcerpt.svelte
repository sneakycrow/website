<script lang="ts">
  import PostCategory from "./PostCategory.svelte";
  import type { Category } from "$lib/posts";

  export let post: {
    slug: string;
    title: string;
    summary: string;
    date: string;
    category: Category;
  };

  const date = new Date(post.date ?? Date.now());
</script>

<div class="flex lg:items-center w-full justify-between items-start flex-row-reverse">
  <PostCategory category={post.category} />
  <div class="text-left lg:max-w-[80%]">
    <p class="text-xs italic text-gray-300">{date.toLocaleDateString()}</p>
    <a
      class="lg:text-2xl text-xl font-bold uppercase text-black dark:text-white transition-opacity"
      href={post.slug}
    >
      {post.title}
    </a>
    <p class="text-lg italic text-gray-400">{post.summary}</p>
  </div>
</div>
