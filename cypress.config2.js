const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "jvfmkm",
  viewportWidth: 1920,
  viewportHeight: 1080,
  video:false,
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
