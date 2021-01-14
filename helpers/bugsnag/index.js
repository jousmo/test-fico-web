import React from "react"
import Bugsnag from "@bugsnag/js"
import BugsnagPluginReact from "@bugsnag/plugin-react"

setTimeout(() => {}).__proto__.unref = () => {}

if (!Bugsnag._client) {
  Bugsnag.start({
    apiKey: "aad08869c7acd9406928aec60a2baece",
    plugins: [new BugsnagPluginReact(React)]
  })
}

const ErrorBoundary = Bugsnag.getPlugin("react")

export { ErrorBoundary as ErrorBoundary, Bugsnag }
