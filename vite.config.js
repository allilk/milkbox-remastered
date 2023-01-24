import { sveltekit } from "@sveltejs/kit/vite";

export default {
  plugins: [sveltekit()],
  preview: {
    port: 3000,
    strictPort: false,
  },
  server: {
    port: 3000,
    strictPort: false,
  },
};
