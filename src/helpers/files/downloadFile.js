export const downloadFile = async (name, id) => {
  const response = await gapi.client.drive.files.get({
    fileId: id,
    alt: "media",
  });

  const len = response.body.length;
  const ar = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    ar[i] = response.body.charCodeAt(i);
  }

  const blob = new Blob([ar], {
    type: response.headers["Content-Type"],
  });

  const link = document.createElement("a");

  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", name);

  link.click();
};
