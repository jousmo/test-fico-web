const withSass = require("@zeit/next-sass")
const withCSS = require("@zeit/next-css")
let options = {}

if(process.env.NODE_ENV !== "production") {
  const webpack = require("webpack")
  const { parsed: localEnv } = require("dotenv").config()
  options = {
    webpack: (config) => {
      config.plugins.push(
        new webpack.EnvironmentPlugin(localEnv)
      )

      return config
    }
  }
}

module.exports = withSass(withCSS(options))
