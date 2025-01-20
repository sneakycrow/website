interface FileNode {
  name: string;
  type: "file" | "folder";
  children: FileNode[];
}

export const buildFileTree = (name: string, paths: string[]): FileNode => {
  const root: FileNode = { name, type: "folder", children: [] };

  paths.forEach((path) => {
    const parts = path.split("/");
    let currentNode = root;

    parts.forEach((part, index) => {
      let existingChild = currentNode.children.find((child) => child.name === part);
      if (!existingChild) {
        // If it's the last part of the path, it's a file
        // Otherwise, it's a folder
        const newNode: FileNode = {
          name: part,
          type: index === parts.length - 1 ? "file" : "folder",
          children: []
        };
        currentNode.children.push(newNode);
        existingChild = newNode;
      } else if (index === parts.length - 1) {
        // If we're at the last part and the node already exists,
        // it might have been created as a folder earlier, but it's actually a file
        existingChild.type = "file";
      }

      currentNode = existingChild;
    });
  });

  return root;
};

export const parseFileList = (fileList: FileList, rootPath: string = ""): FileNode => {
  const root: FileNode = {
    name: "root",
    type: "folder",
    children: []
  };

  Array.from(fileList).forEach((file) => {
    const filePath = file.webkitRelativePath
      ? rootPath
        ? `${rootPath}/${file.name}`
        : file.webkitRelativePath
      : rootPath
        ? `${rootPath}/${file.name}`
        : file.name;

    const parts = filePath.split("/");
    let currentNode = root;

    // Handle all parts of the path except the last one (filename)
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      let folder = currentNode.children.find(
        (child) => child.name === part && child.type === "folder"
      );

      if (!folder) {
        folder = {
          name: part,
          type: "folder",
          children: []
        };
        currentNode.children.push(folder);
      }
      currentNode = folder;
    }

    // Handle the file itself
    const fileName = parts[parts.length - 1];
    const existingFile = currentNode.children.find(
      (child) => child.name === fileName && child.type === "file"
    );

    if (!existingFile) {
      currentNode.children.push({
        name: fileName,
        type: "file",
        children: []
      });
    }
  });

  return root;
};
