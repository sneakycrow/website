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

  // Returns a tailwind class for each category
  export const getTailwindColors = (category: Category): string => {
    switch (category) {
      case "tech": {
        return "text-pink-500";
      }
      case "art": {
        return "text-blue-500";
      }
      case "gaming": {
        return "text-purple-500";
      }
      case "thoughts": {
        return "text-yellow-500";
      }
      default: {
        return "text-white";
      }
    }
  };
  const categoryColor = getTailwindColors(post.category);
</script>

<div class="flex flex-col justify-center items-start w-full">
  <div class="flex flex-nowrap space-x-2">
    {#if post.draft}
      <p class="uppercase font-bold text-error-500">Draft</p>
    {:else}
      <p class={`uppercase font-bold ${categoryColor}`}>{post.category}</p>
    {/if}
    <p class="text-xs italic text-white/40">{date.toLocaleDateString()}</p>
  </div>
  <a class={`lg:text-2xl text-xl font-bold uppercase text-black dark:text-white`} href={post.slug}>
    {post.title}
  </a>
  <p class="text-lg italic text-white/60">{post.summary}</p>
</div>
