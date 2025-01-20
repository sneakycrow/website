<script lang="ts">
  import Upload from "$lib/components/Upload.svelte";
  import type { UploadableFile } from "$lib/components/Upload.svelte";
  import axios from "axios";
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import type { PageServerData } from "./$types";
  import type { ActionData } from "./$types";
  import { invalidateAll } from "$app/navigation";
  import { nanoid } from "nanoid/non-secure";
  import FileBrowser from "$lib/components/FileBrowser.svelte";

  interface Props {
    data: PageServerData;
    form: ActionData;
  }

  let { data }: Props = $props();
  type FileProgress = {
    name: string;
    progress: number;
    status: "pending" | "uploading" | "complete" | "error";
  };

  let fileUploadProgress: FileProgress[] = $state([]);
  // This function will upload the entire file in one request
  const _uploadEntireFile = async (file: File) => {
    // First, grab a presigned URL from the server
    const startUploadResponse = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fileKey: file.name
      })
    });
    // Get the presigned URL from the response
    const { url } = await startUploadResponse.json();
    // Upload the file to the presigned URL using axios, so we can track the progress
    const res = await axios.put(url, file, {
      onUploadProgress: (progressEvent) => {
        // Update the progress bar
        const progressTotal = progressEvent.total;
        // If we can't compute the total, just return
        if (!progressTotal) {
          return;
        }
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressTotal);
        // Update the progress bar
        fileUploadProgress = fileUploadProgress.map((fileProgress) => {
          if (fileProgress.name === file.name) {
            const status = percentCompleted === 100 ? "complete" : "uploading";
            return {
              name: file.name,
              progress: percentCompleted,
              status
            };
          }
          return fileProgress;
        });
      }
    });
    // If the upload was successful, mark the upload as complete
    if (res.status === 200) {
      fileUploadProgress = fileUploadProgress.map((fileProgress) => {
        if (fileProgress.name === file.name) {
          return {
            name: file.name,
            progress: 100,
            status: "complete"
          };
        }
        return fileProgress;
      });
    }
  };
  // This initializes a multipart upload
  // It will split the file into chunks, then request a presigned URL for each chunk
  // Then it will upload each chunk to the presigned URL, and return the relative eTag for each chunk
  // FIXME: When uploading a multipart file, we can successfully upload the file but marking the upload as complete fails
  const uploadMultipartFile = async (file: File) => {
    let chunks = [];
    // 5MB chunks
    const chunkSize = 1024 * 1024 * 5; // 5MB
    const chunksCount = Math.ceil(file.size / chunkSize);
    for (let i = 0; i < chunksCount; i++) {
      const start = chunkSize * i;
      const end = Math.min(file.size, start + chunkSize);
      const chunk = file.slice(start, end);
      chunks.push(chunk);
    }
    // Extract the file name from the file path as well as the amount of parts
    const partNumber = chunks.length;
    const fileKey = nanoid() + file.name.slice(file.name.lastIndexOf("."));
    // Request a presigned URL for each part
    const startUploadResponse = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        parts: partNumber,
        fileKey: `some/random/folder/${fileKey}`,
        command: "start"
      })
    });
    const startUploadResponseJson = await startUploadResponse.json();
    const { urls } = startUploadResponseJson;
    // Upload each part to the presigned URL, each one should return an Etag
    await Promise.all(
      chunks.map(async (chunk, index): Promise<string> => {
        const presignedUrl = urls[index];
        const res = await fetch(presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/octet-stream"
          },
          body: chunk
        });
        const etag = res.headers.get("Etag");
        if (!etag) {
          throw new Error(`Could get etag from upload part ${index + 1}`);
        }
        return etag;
      })
    );
    // Start the file upload and update the progress bar
  };
  // This is a wrapper function that will call the correct upload function based on the file size
  const uploadFiles = async (allFiles: UploadableFile[]) => {
    // Update the files array with each of our file keys, so we can track upload progress
    fileUploadProgress = allFiles.map((file) => ({
      name: file.data.name,
      progress: 0,
      status: "uploading"
    }));
    // Create a promise for each file so we can upload them in parallel
    const uploadPromises = allFiles.map(async (file) => {
      // This function will be called when the promise is executed
      // It will start the multipart upload, then finish it
      try {
        await uploadMultipartFile(file.data);
      } catch (error) {
        console.error(`Could not upload file ${file.data.name}`);
      }
    });
    // Run all the multipart upload promises in parallel
    await Promise.allSettled(uploadPromises);
    // Reset the form state
    fileUploadProgress = [];
    await invalidateAll();
  };
</script>

<section class="lg:col-span-4 lg:col-start-2">
  <FileBrowser files={data.files} />
</section>

<form method="POST" action="?/files" class="lg:col-span-4 lg:col-start-2">
  <Upload
    name="admin-upload"
    onSubmit={uploadFiles}
    uploadingFiles={fileUploadProgress.filter((f) => f.status === "uploading")}
  />
</form>

{#each fileUploadProgress.filter((f) => f.status === "uploading") as fileProgress}
  <div class="w-full my-4">
    <ProgressBar
      label={fileProgress.name}
      value={fileProgress.progress}
      max={100}
      track="bg-primary-300"
      bar="bg-primary-500"
    />
  </div>
{/each}

{#if fileUploadProgress.some((f) => f.status === "complete")}
  <h1>Completed Uploads</h1>
  {#each fileUploadProgress.filter((f) => f.status === "complete") as fileProgress}
    <div class="w-full my-4">
      <p>{fileProgress.name}</p>
    </div>
  {/each}
{/if}
