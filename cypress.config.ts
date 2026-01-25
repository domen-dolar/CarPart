import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // default baseUrl za lokalni razvoj
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
