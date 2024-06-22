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
  base: "/best_shop_responsive/",
  server: {
    port: 3000,
  },
});
