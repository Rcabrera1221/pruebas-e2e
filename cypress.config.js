const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    video: true,
    screenshotsFolder: 'cypress/screenshots', 
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true, 
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'reporte-e2e',
      overwrite: true,
      html: true,
      json: true,
    },
  },
});

