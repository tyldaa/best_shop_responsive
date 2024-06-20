import { defineConfig } from "vite";

/**
 * Path to exercise folder
 */
const projectRootPath = "src";

/**
 * Don't change those lines below
 */
export default defineConfig({
  root: projectRootPath,
  server: {
    port: 3000,
  },
});
