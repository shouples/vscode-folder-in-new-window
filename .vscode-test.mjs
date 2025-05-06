import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
  files: "out/*.test.js",
  mocha: {
    ui: "bdd",
    timeout: 10_000,
  },
});
