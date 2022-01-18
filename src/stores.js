import { writable } from 'svelte/store';

// OAuth client variables
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'];
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

// other variables
const isAuthenticated = writable(false);
const message = writable('');

export { DISCOVERY_DOCS, SCOPES, isAuthenticated, message };
