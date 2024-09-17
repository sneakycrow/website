<script lang="ts">
  import type { Post } from "$lib/posts";
  import MarkdownRenderer from "./MarkdownRenderer.svelte";
  import { formatDistanceToNow, format } from "date-fns";

  export let post: Post;
  $: editsShown = false;

  function toggleEditsShown() {
    editsShown = !editsShown;
  }

  $: lastEdit = post.edits ? post.edits[post.edits.length - 1] : null;
</script>

<div
  class={`grid grid-cols-8 gap-4 items-start justify-center my-10 relative ${$$restProps.class}`}
>
  <article
    class="lg:text-lg w-full lg:col-start-2 col-span-8 lg:col-span-6 max-w-screen-xl space-y-6 z-10"
  >
    <a href={post.slug} class="text-black dark:text-white">
      <h2 class="text-3xl lg:text-4xl font-bold">{post.title}</h2>
    </a>
    <aside class="space-y-2 text-sm text-gray-500">
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
      <button on:click={toggleEditsShown} class="text-sm"
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
      class="z-0 right-10 lg:top-40 bottom-10 fixed uppercase px-8 align-bottom text-error-100 text-9xl font-black leading-3 col-start-4 vertical-writing-lr"
    >
      Draft
    </p>
  {/if}
</div>
