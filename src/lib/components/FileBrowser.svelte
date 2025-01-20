<script lang="ts">
  import FileRenderer from "./FileRenderer.svelte";

  interface FileNode {
    name: string;
    type: "file" | "folder";
    children: FileNode[];
  }

  interface UploadFile {
    file: File;
    targetPath: string;
  }

  type InteractivityMode = "view" | "download" | "edit";
  interface Props {
    files: FileNode;
    mode?: InteractivityMode;
  }

  let { files, mode: _mode = "download" }: Props = $props();

  // Keep track of files to be uploaded
  let uploadQueue: UploadFile[] = $state([]);

  // Create a Set of pending upload paths
  let pendingUploadPaths = $derived.by(() => {
    const paths = new Set<string>();
    uploadQueue.forEach(({ file, targetPath }) => {
      const fullPath = `${targetPath}/${file.name}`;
      paths.add(fullPath);
    });
    return paths;
  });

  // Build complete file tree including uploaded files
  let completeFileTree = $derived.by(() => {
    if (uploadQueue.length === 0) return files;

    // Create file tree from upload queue
    const uploadTree: FileNode = {
      name: "root",
      type: "folder",
      children: []
    };

    // Helper to insert file at path
    const insertFileAtPath = (root: FileNode, file: File, path: string) => {
      const parts = path.split("/");
      let current = root;

      // Navigate to the correct folder
      for (const part of parts) {
        let folder = current.children.find(
          (child) => child.name === part && child.type === "folder"
        );

        if (!folder) {
          folder = { name: part, type: "folder", children: [] };
          current.children.push(folder);
        }

        current = folder;
      }

      // Add the file to the current folder
      current.children.push({
        name: file.name,
        type: "file",
        children: []
      });
    };

    // Build upload tree
    uploadQueue.forEach(({ file, targetPath }) => {
      insertFileAtPath(uploadTree, file, targetPath);
    });

    // Merge trees function
    const mergeTrees = (base: FileNode, overlay: FileNode): FileNode => {
      if (base.type !== "folder" || overlay.type !== "folder") return base;

      const mergedChildren = new Map();

      // Add base children
      base.children.forEach((child) => {
        mergedChildren.set(child.name, child);
      });

      // Merge overlay children
      overlay.children.forEach((child) => {
        if (mergedChildren.has(child.name)) {
          const existing = mergedChildren.get(child.name);
          if (existing.type === "folder" && child.type === "folder") {
            mergedChildren.set(child.name, mergeTrees(existing, child));
          } else {
            mergedChildren.set(child.name, child);
          }
        } else {
          mergedChildren.set(child.name, child);
        }
      });

      return {
        ...base,
        children: Array.from(mergedChildren.values())
      };
    };

    // Merge base files with upload tree
    return mergeTrees(files, uploadTree);
  });

  // Handler for file drops
  function handleFilesDropped(files: FileList, targetPath: string) {
    const newFiles = Array.from(files).map((file) => ({
      file,
      targetPath
    }));
    uploadQueue = [...uploadQueue, ...newFiles];
  }
</script>

<div class="border-2 border-surface-900 border-dashed w-full p-4">
  <FileRenderer
    files={completeFileTree}
    onFilesDropped={handleFilesDropped}
    pendingUploads={pendingUploadPaths}
  />
</div>
