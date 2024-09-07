<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings } from "@skeletonlabs/skeleton";
  const modalStore = getModalStore();
  const modal: ModalSettings = {
    type: "prompt",
    // Data
    title: "Enter Book Title",
    body: "Please enter the title of the book you would like to add.",
    // Populates the input value and attributes
    value: "",
    valueAttr: { type: "text", minlength: 3, maxlength: 10, required: true },
    // Returns the updated response value
    response: (r: string) => console.log("response:", r)
  };
</script>

<section class="grid grid-cols-6 w-full">
  <h3 class="text-2xl col-span-2 col-start-1">Manage Books</h3>
  <div class="col-span-1 col-start-6 justify-self-end">
    <button
      type="button"
      class="btn variant-filled-primary"
      on:click={() => modalStore.trigger(modal)}
    >
      <span>
        <Icon icon="mdi:plus-box" class="w-6 h-6" />
      </span>
      <span>Add Book</span>
    </button>
  </div>
</section>
