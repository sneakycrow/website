<script lang="ts">
  import { Accordion, AccordionItem, FileDropzone } from "@skeletonlabs/skeleton";
  import FileRenderer from "./FileRenderer.svelte";
  import Document from "./icons/Document.svelte";
  import Folder from "./icons/Folder.svelte";

  interface Props {
    files: FileNode;
    parentPath?: string;
    onFilesDropped: (items: DataTransferItemList, targetPath: string) => void;
    pendingUploads?: Set<string>;
  }

  let { files, parentPath = "", onFilesDropped, pendingUploads = new Set() }: Props = $props();

  interface FileNode {
    name: string;
    type: "file" | "folder";
    children: FileNode[];
  }

  let dropzoneEnabled = $state(false);
  let dragCounter = $state(0);

  const accordionSettings = {
    duration: 200,
    exclusive: false,
    rounded: "",
    padding: "[&:not(:first-child)]:pl-4 pl-2",
    regionControl: "pr-4 py-2"
  };

  function handleDragEnter(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    dragCounter++;
    dropzoneEnabled = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
      dropzoneEnabled = false;
    }
  }

  function handleDrop(e: DragEvent, folderName: string) {
    e.stopPropagation();
    e.preventDefault();

    if (e.dataTransfer?.items) {
      const targetPath = parentPath ? `${parentPath}/${folderName}` : folderName;
      onFilesDropped(e.dataTransfer.items, targetPath);
    }

    dragCounter = 0;
    dropzoneEnabled = false;
  }

  function handleDragOver(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  function isPendingUpload(node: FileNode): boolean {
    const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;

    // For files, just check if the file itself is pending
    if (node.type === "file") {
      return pendingUploads.has(fullPath);
    }

    // For folders, we need to identify if this folder is part of a new upload structure
    return Array.from(pendingUploads).some((path) => {
      // Find the target folder path (the folder where files were dropped)
      const targetFolderPath = path.split("/").slice(0, -2).join("/");

      // If this node is in or above the target folder, don't highlight it
      if (targetFolderPath.startsWith(fullPath) || fullPath === targetFolderPath) {
        return false;
      }

      // If this node is part of the new structure being added, highlight it
      const relativePath = path.slice(targetFolderPath.length + 1);
      const relativePathParts = relativePath.split("/");
      return relativePathParts[0] === node.name;
    });
  }
</script>

<Accordion {...accordionSettings}>
  {#if files.type === "folder"}
    {#each files.children as node}
      {#if node.type === "folder"}
        <div
          class="relative"
          role="application"
          ondragenter={handleDragEnter}
          ondragleave={handleDragLeave}
          ondrop={(e) => handleDrop(e, node.name)}
          ondragover={handleDragOver}
        >
          <FileDropzone
            name="file-browser-upload"
            class="absolute !p-2 top-0 left-0 m-0 w-full py-2 {dropzoneEnabled
              ? 'opacity-70 z-20 pointer-events-auto'
              : 'opacity-0 -z-10 pointer-events-none'}"
          />
          <AccordionItem regionControl="z-0 absolute top-0 left-0 w-full pr-4 py-2">
            {#snippet lead()}
              <div class={isPendingUpload(node) ? "text-primary-500" : ""}>
                <Folder />
              </div>
            {/snippet}
            {#snippet summary()}
              <span class={isPendingUpload(node) ? "text-primary-500" : ""}>
                {node.name}
              </span>
            {/snippet}
            {#snippet content()}
              <FileRenderer
                files={{
                  name: node.name,
                  type: "folder",
                  children: node.children
                }}
                parentPath={parentPath ? `${parentPath}/${node.name}` : node.name}
                {onFilesDropped}
                {pendingUploads}
              />
            {/snippet}
          </AccordionItem>
        </div>
      {:else}
        <div class="flex flex-nowrap gap-2 p-2">
          <div class={isPendingUpload(node) ? "text-primary-500" : ""}>
            <Document />
          </div>
          <span class={isPendingUpload(node) ? "text-primary-500" : ""}>
            {node.name}
          </span>
        </div>
      {/if}
    {/each}
  {/if}
</Accordion>
