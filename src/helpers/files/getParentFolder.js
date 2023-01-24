export const getParentFolder = async (id) => {
  if (["shared-with-me", "starred", "trash"].includes(id))
    return {
      name:
        id === "shared-with-me"
          ? "Shared With Me"
          : id === "starred"
          ? "Starred"
          : id === "trash"
          ? "Trash"
          : "",
      id: "root",
      mimeType: "folder",
      alternateName: "..",
    };

  const response = await gapi.client.drive.files.get({
    fileId: id,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: "name, id, parents, driveId, shared, sharedWithMeTime",
  });

  const file = response.result;
  let parentId = "root";
  let folderName = file.name;

  if (file.driveId === id) {
    const sharedDrive = await gapi.client.drive.drives.get({
      driveId: file.driveId,
    });
    folderName = sharedDrive.result.name;
    parentId = "shared-drives";
  } else if (file.shared && file.sharedWithMeTime) {
    parentId = "shared-with-me";
  } else if (file.parents) {
    parentId = file.parents[0];
  }

  return {
    id: parentId,
    name: folderName,
    mimeType: "folder",
    alternateName: "..",
  };
};
