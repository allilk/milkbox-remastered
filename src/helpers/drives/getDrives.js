export const getDrives = async (nextPageToken) => {
  const response = await gapi.client.drive.drives.list({
    pageSize: 100,
    pageToken: nextPageToken,
    field: "nextPageToken, drives(name, id, hidden, restrictions)",
  });

  return {
    drives: response.result?.drives || [],
    nextPageToken: response.result?.nextPageToken,
  }
};
