<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { Category } from "$lib/posts";
  import { toTitleCase } from "$lib/util";

  export let category: Category;
  type CategoryMeta = {
    category: string; // The original category name
    copy: string; // Title-cased category name
    icon: string; // Icon property from iconify
    color: string; // Color for the border of the category
  };
  const ICON_SIZE = 64;
  const getCategoryMeta = (category: Category): CategoryMeta => {
    switch (category) {
      case "gaming":
        return {
          category: category,
          copy: toTitleCase(category),
          icon: "mdi:gamepad-variant",
          color: "text-green-500"
        };
      case "tech":
        return {
          category: category,
          copy: toTitleCase(category),
          icon: "mdi:code-tags",
          color: "text-blue-500"
        };
      default:
        return {
          category: category,
          copy: toTitleCase(category),
          icon: "mdi:file-document",
          color: "text-gray-500"
        };
    }
  };
</script>

<div class={`text-center lg:pr-2 h-auto ${getCategoryMeta(category).color} ${$$restProps.class}`}>
  <button
    class="w-full h-full text-gray-400 font-light flex flex-nowrap items-center justify-center space-x-2 lg:space-y-2"
  >
    <Icon
      icon={getCategoryMeta(category).icon}
      width={ICON_SIZE}
      height={ICON_SIZE}
      class={`${getCategoryMeta(category).color} py-4 lg:p-0`}
    />
  </button>
</div>
