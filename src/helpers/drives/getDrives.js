export const getDrives = async (nextPageToken, pageSize) => {
  const response = await gapi.client.drive.drives.list({
    pageSize:  pageSize,
    pageToken: nextPageToken,
    field: "nextPageToken, drives(name, id, hidden, restrictions)",
  });

  return {
    drives: response.result?.drives || [],
    nextPageToken: response.result?.nextPageToken,
  }
};
