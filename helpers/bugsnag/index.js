import React from "react"
import Bugsnag from "@bugsnag/js"
import BugsnagPluginReact from "@bugsnag/plugin-react"

setTimeout(() => {}).__proto__.unref = () => {}

if (!Bugsnag._client) {
  const ignoredErrors = [
    "ResizeObserver loop limit exceeded"
  ]

  Bugsnag.start({
    apiKey: "aad08869c7acd9406928aec60a2baece",
    plugins: [new BugsnagPluginReact(React)],
    onError: ({ errors: [{ errorMessage }]}) => {
      if(ignoredErrors.includes(errorMessage)) {
        return false
      }
    }
  })
}

const ErrorBoundary = Bugsnag.getPlugin("react")

export { ErrorBoundary as ErrorBoundary, Bugsnag }
