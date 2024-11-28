<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { Post } from "$lib/posts";
  import MarkdownRenderer from "./MarkdownRenderer.svelte";
  import { formatDistanceToNow, format } from "date-fns";

  interface Props {
    post: Post;
    [key: string]: any
  }

  let { post, ...rest }: Props = $props();
  let editsShown = $state(false);
  

  function toggleEditsShown() {
    editsShown = !editsShown;
  }

  let lastEdit = $derived(post.edits ? post.edits[post.edits.length - 1] : null);

  let showScrollButton = $state(false);

  onMount(() => {
    const handleScroll = () => {
      showScrollButton = window.scrollY > 200;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<div
  class={`grid grid-cols-8 gap-4 items-start justify-center my-10 relative ${rest.class}`}
>
  <article
    class="lg:text-lg w-full lg:col-start-2 col-span-8 lg:col-span-6 max-w-screen-xl space-y-6 z-10"
  >
    <div class="flex flex-col space-y-2">
      <a href={post.slug} class="text-black dark:text-white">
        <h2 class="text-3xl lg:text-4xl font-bold">{post.title}</h2>
      </a>
      <h4 class="text-lg lg:text-xl font-semibold">
        by <a href="mailto:zach@sneakycrow.dev">Zachary Corvidae</a>
      </h4>
    </div>
    <aside class="space-y-2 text-sm text-white/50">
      <p class="leading-3">
        Published on {format(post.date, "LLLL do, yyyy")} ({formatDistanceToNow(post.date)} ago)
      </p>
      {#if lastEdit}
        <p class="mb-2">
          Last edited {formatDistanceToNow(new Date(Number(lastEdit.timestamp) * 1000))} ago by {lastEdit.author}
        </p>
      {/if}
      <p class="leading-3">
        <span> {post.reading_minutes} min read </span>
      </p>
    </aside>
    <MarkdownRenderer source={post.body} />
  </article>
  {#if post.edits}
    <div class="lg:col-span-1 col-span-8 text-xs mt-20 py-4 lg:mt-0 lg:py-0 z-10">
      <button onclick={toggleEditsShown} class="text-sm"
        >{editsShown ? "Hide" : "Show"} Edits</button
      >
      {#if editsShown}
        <ul class="list-disc pl-6">
          {#each post.edits as edit}
            <li>
              <a
                href={`https://github.com/sneakycrow/website/commits/${edit.id}`}
                target="_blank"
                class="text-tertiary-900"
                rel="noopener noreferrer"
              >
                Edited by {edit.author} on {format(
                  new Date(Number(edit.timestamp) * 1000),
                  "LLLL do, yyyy"
                )}
                {edit.message}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
  {#if post.draft}
    <p
      class="z-0 right-10 lg:top-40 bottom-10 fixed uppercase px-8 align-bottom dark:text-error-700 text-error-100 text-9xl font-black leading-3 col-start-4 vertical-writing-lr"
    >
      Draft
    </p>
  {/if}

  {#if showScrollButton}
    <button
      onclick={scrollToTop}
      class="fixed lg:bottom-20 bottom-4 right-4 bg-primary-500 text-white p-2 rounded-full shadow-lg z-50"
      transition:fade
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  {/if}
</div>
