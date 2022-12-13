const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

const { VuetifyLoaderPlugin } = require('vuetify-loader')

exports.plugins.push(
  new VuetifyLoaderPlugin()
)