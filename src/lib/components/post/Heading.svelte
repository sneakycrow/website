<script>
  import { fade } from "svelte/transition";
  import { clipboard } from "@skeletonlabs/skeleton";
  import { browser } from "$app/environment";
  import Copy from "../icons/Copy.svelte";

  export let depth;
  export let raw;
  export let text;
  // A url-friendly id for the heading, generated from the text
  const id = text ? text.replace(/ /g, "-") : "";
  // Whether to show a link to the heading
  let isActionsShown = false;
  const showActions = () => {
    isActionsShown = true;
  };
  const hideActions = () => {
    isActionsShown = false;
  };
  // Whether the feedback after copying the link should be shown
  let isCopyFeedbackShown = false;
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
  $: fullUrl = browser ? `${window.location.href}#${id}` : "";
</script>

<div
  on:mouseenter={showActions}
  on:mouseleave={hideActions}
  class="flex flex-nowrap items-center justify-start space-x-4"
  role="button"
  aria-roledescription="whether or not to show the link to the header"
  tabindex="0"
>
  {#if depth === 1}
    <h1 class="text-xl font-bold my-4" {id}>
      <slot />
    </h1>
  {:else if depth === 2}
    <h2 class="text-xl font-bold my-4" {id}>
      <slot />
    </h2>
  {:else if depth === 3}
    <h3 class="text-lg font-bold my-4" {id}>
      <slot />
    </h3>
  {:else if depth === 4}
    <h4 class="font-bold my-4" {id}>
      <slot />
    </h4>
  {:else if depth === 5}
    <h5 class="font-bold my-2" {id}>
      <slot />
    </h5>
  {:else if depth === 6}
    <h6 class="font-bold" {id}>
      <slot />
    </h6>
  {:else}
    {raw}
  {/if}
  {#if isActionsShown || isCopyFeedbackShown}
    <!-- A button for copying the link to the header -->
    <button
      transition:fade={{ duration: 150 }}
      class="text-white/50 hover:text-white/30 flex flex-nowrap items-center space-x-1"
      title="Copy link to this section"
      aria-label="Copy link to this section"
      use:clipboard={fullUrl}
      on:click={onCopy}
    >
      <!--  clipboard icon -->
      <Copy />
      {#if isCopyFeedbackShown}
        <span transition:fade={{ duration: 150 }} class="text-sm">Copied!</span>
      {/if}
    </button>
  {/if}
</div>
