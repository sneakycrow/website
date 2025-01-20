<script module lang="ts">
  export type UploadableFile = {
    data: File;
    progress: number;
  };
</script>

<script lang="ts">
  import { FileButton, FileDropzone, ProgressRadial } from "@skeletonlabs/skeleton";
  import prettyBytes from "pretty-bytes";
  import Upload from "./icons/Upload.svelte";
  import Document from "./icons/Document.svelte";
  import Trash from "./icons/Trash.svelte";

  interface Props {
    name: string;
    onSubmit: (files: UploadableFile[]) => Promise<void>;
    uploadingFiles?: { name: string }[];
    disabled?: boolean;
  }

  let { name, onSubmit, uploadingFiles = [], disabled = false }: Props = $props();

  let selectedFiles: FileList | undefined = $state();
  let allFiles: UploadableFile[] = $state([]);

  const onChangeHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files && !disabled) {
      allFiles = [...allFiles, ...Array.from(files).map((data) => ({ data, progress: 0 }))];
    }
  };

  const removeFile = (file: UploadableFile) => {
    allFiles = allFiles.filter((f) => f.data.name !== file.data.name);
  };

  const handleSubmit = async () => {
    await onSubmit(allFiles);
    allFiles = [];
  };
</script>

<section
  class="px-2 space-y-4 flex flex-col items-center justify-center py-4 rounded-md {disabled &&
    'opacity-50'}"
>
  <FileButton
    bind:files={selectedFiles}
    button="inline-block bg-primary-500 text-white py-1 px-6 border-primary-500 border rounded-md hover:cursor-pointer hover:bg-black hover:text-white"
    name="files"
    on:change={onChangeHandler}
  >
    Add a file
  </FileButton>
  <FileDropzone bind:files={selectedFiles} {name} on:change={onChangeHandler}>
    {#snippet lead()}
      <Upload width={128} height={128} class="mx-auto" />
    {/snippet}
    {#snippet message()}
      Upload a file or drag and drop
    {/snippet}
  </FileDropzone>
</section>

{#if allFiles.length > 0}
  <section class="flex flex-col p-4 space-y-4 textarea">
    {#each allFiles as file}
      <div class="p-2 mb-2 relative">
        {#if uploadingFiles.find((f) => f.name === file.data.name)}
          <div
            class="absolute w-full left-0 top-0 h-full flex items-center justify-center bg-neutral-300/50"
          >
            <ProgressRadial
              width="w-6"
              meter="stroke-primary-500"
              track="stroke-primary-500/30"
              strokeLinecap="butt"
            />
          </div>
        {/if}
        <div class="flex justify-between items-center h-[65px]">
          <div class="flex items-center">
            <Document class="mr-4" />
            <div>
              <div class="font-bold">{file.data.name}</div>
              <div class="text-gray-500">{file.data.type}</div>
            </div>
          </div>
          <div class="flex items-center">
            <div class="text-gray-500">{prettyBytes(file.data.size)} bytes</div>
            <button
              class="ml-2"
              type="button"
              onclick={() => removeFile(file)}
              disabled={uploadingFiles.length > 0}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    {/each}
    <button
      class="self-center bg-primary-500 text-white py-1 px-6 border-black border rounded-md hover:cursor-pointer hover:bg-primary-hover-token hover:text-white"
      type="button"
      onclick={handleSubmit}
    >
      Submit Upload
    </button>
  </section>
{/if}
