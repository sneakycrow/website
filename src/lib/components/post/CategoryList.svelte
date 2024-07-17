<script lang="ts">
  import PostCategory from "./PostCategory.svelte";
  import type { Category } from "$lib/posts";
  export let categories: Category[] = [];
  export let handleCategoryClick: (category: Category) => void;
</script>

<section class={`grid grid-cols-6 ${$$restProps.class}`}>
  {#each categories as category}
    <PostCategory {category} handleClick={handleCategoryClick} />
  {/each}
</section>
