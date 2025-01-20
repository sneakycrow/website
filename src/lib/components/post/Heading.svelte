<script lang="ts">
  import { fade } from "svelte/transition";
  import { clipboard } from "@skeletonlabs/skeleton";
  import { browser } from "$app/environment";
  import Copy from "../icons/Copy.svelte";

  let { depth, raw, text, children } = $props();
  // A url-friendly id for the heading, generated from the text
  const id = text ? text.replace(/ /g, "-") : "";
  // Whether to show a link to the heading
  let isActionsShown = $state(false);
  const showActions = () => {
    isActionsShown = true;
  };
  const hideActions = () => {
    isActionsShown = false;
  };
  // Whether the feedback after copying the link should be shown
  let isCopyFeedbackShown = $state(false);
  // A timeout for showing and hiding the feedback
  const copyFeedbackTimeout = 500;
  const toggleCopyFeedback = () => {
    isCopyFeedbackShown = true;
    setTimeout(() => {
      isCopyFeedbackShown = false;
    }, copyFeedbackTimeout);
  };
  // A function for side effects when copying
  const onCopy = () => {
    // Toggle the feedback
    toggleCopyFeedback();
    // Update the url and scroll to the heading
    browser && window.location.replace(`#${id}`);
  };

  // A full url generated from the id at runtime
  let fullUrl = $derived(browser ? `${window.location.href}#${id}` : "");
</script>

<div
  onmouseenter={showActions}
  onmouseleave={hideActions}
  class="flex flex-nowrap items-center justify-start space-x-4"
  role="button"
  aria-roledescription="whether or not to show the link to the header"
  tabindex="0"
>
  {#if depth === 1}
    <h1 class="text-3xl font-bold" {id}>
      {@render children?.()}
    </h1>
  {:else if depth === 2}
    <h2 class="text-2xl font-bold" {id}>
      {@render children?.()}
    </h2>
  {:else if depth === 3}
    <h3 class="text-xl font-bold" {id}>
      {@render children?.()}
    </h3>
  {:else if depth === 4}
    <h4 class="text-lg font-bold" {id}>
      {@render children?.()}
    </h4>
  {:else if depth === 5}
    <h5 class="font-bold my-2" {id}>
      {@render children?.()}
    </h5>
  {:else if depth === 6}
    <h6 class="font-bold" {id}>
      {@render children?.()}
    </h6>
  {:else}
    {raw}
  {/if}
  {#if isActionsShown || isCopyFeedbackShown}
    <button
      transition:fade={{ duration: 150 }}
      class="text-white/50 hover:text-white/30 flex flex-nowrap items-center space-x-1"
      title="Copy link to this section"
      aria-label="Copy link to this section"
      use:clipboard={fullUrl}
      onclick={onCopy}
    >
      <Copy />
      {#if isCopyFeedbackShown}
        <span transition:fade={{ duration: 150 }} class="text-sm">Copied!</span>
      {/if}
    </button>
  {/if}
</div>
