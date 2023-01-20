const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "jvfmkm",
  viewportWidth: 1366,
  viewportHeight: 768,
  video:false,
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
