const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "zcsojw",
  e2e: {
    baseUrl: 'https://front.serverest.dev/cadastrarusuarios',
  },
  env: {
    requestMode: true
  }
})
