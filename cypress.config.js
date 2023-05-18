const fs = require('fs')
const dotenv = require('dotenv');
const { defineConfig } = require('cypress');
dotenv.config();

module.exports = defineConfig({
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  videosFolder: 'cypress/videos',
  downloadsFolder: 'downloads/',
  chromeWebSecurity: false,
  experimentalWebKitSupport: true,
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
  viewportHeight: 660,
  viewportWidth:1000,
  reporter: 'mochawesome',
  
  
  env: {
    baseUrl: process.env.URL,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },

  e2e: {
    experimentalOriginDependencies:true,
    baseUrl: process.env.URL,
    pageLoadTimeout: 40000,
    defaultCommandTimeout: 40000,
    responseTimeout: 40000,
    requestTimeout: 40000,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: true,
      html: true,
      json: true,
      code: false,
    },
  },
});
