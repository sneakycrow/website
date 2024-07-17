<script lang="ts">
  import PostExcerpt from "./PostExcerpt.svelte";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import type { Post, Category } from "$lib/posts";
  import CategoryList from "./CategoryList.svelte";

  export let posts: Post[];

  export let showDrafts = false;
  const handleFilterPosts = (posts: Post[], showDrafts: boolean, showCategories: Category[]) => {
    return posts.filter((post: Post) => {
      return (showDrafts || !post.draft) && showCategories.includes(post.category);
    });
  };
  $: filteredPosts = handleFilterPosts(posts, showDrafts, enabledCategories);
  $: draftExists = posts.some((post) => post.draft);

  // A list of all categories in the posts
  $: postCategories = posts.reduce((acc, post) => {
    if (!acc.includes(post.category)) {
      acc.push(post.category);
    }
    return acc;
  }, [] as Category[]);

  // A list of all posts that have a category that is enabled
  $: enabledCategories = postCategories;
  const filterCategory = (category: Category) => {
    if (enabledCategories.includes(category)) {
      enabledCategories = enabledCategories.filter((c) => c !== category);
    } else {
      enabledCategories = [...enabledCategories, category];
    }
  };
</script>

<section class={`grid grid-flow-row-dense grid-cols-4 items-start ${$$restProps.class}`}>
  <CategoryList
    handleCategoryClick={filterCategory}
    categories={postCategories}
    class="row-start-1 col-span-3 space-x-8 mr-auto my-4"
  />
  {#if draftExists}
    <SlideToggle
      class="ml-auto text-sm row-start-1 col-span-1"
      name="show-drafts-slider"
      active="bg-primary-500"
      size="sm"
      bind:checked={showDrafts}
    >
      Show drafts
    </SlideToggle>
  {/if}
  <section class="col-span-4 min-h-max">
    {#if filteredPosts.length === 0}
      <p class="text-center">No posts found</p>
    {/if}
    {#each filteredPosts as post}
      <PostExcerpt {post} />
    {/each}
  </section>
</section>
