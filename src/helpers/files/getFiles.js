
export const getFiles = async (id, nextPageToken, pageSize) => {
  const query =
    id === "shared-with-me"
      ? "sharedWithMe"
      : id === "trash"
      ? `trashed`
      : id === "starred"
      ? `starred and trashed=false`
      : `'${id}' in parents and trashed=false`;

  const response = await gapi.client.drive.files.list({
    q: query,
    pageSize: pageSize || 250,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    corpora: "allDrives",
    fields:
      "nextPageToken, files(name, id, parents, size, mimeType, modifiedTime, driveId, webViewLink, thumbnailLink, shortcutDetails)",
    orderBy: "folder,name_natural",
    pageToken: nextPageToken,
  });

  return {
    files: response.result?.files || [],
    nextPageToken: response.result?.nextPageToken,
  };
};
