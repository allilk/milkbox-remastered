import { writable } from "svelte/store";

// OAuth client variables
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  "https://people.googleapis.com/$discovery/rest?version=v1",
];
const SCOPES = "https://www.googleapis.com/auth/drive.readonly profile";

// other variables
const isAuthenticated = writable(false);
const message = writable("");

const directorySize = writable(0);
const fileCount = writable(0);

const initialLoading = writable(true);
const loading = writable(true);

const settings = writable({
  pageSize: "100",
  cache: false,
});

export {
  DISCOVERY_DOCS,
  SCOPES,
  isAuthenticated,
  message,
  directorySize,
  fileCount,
  initialLoading,
  loading,
  settings,
};
