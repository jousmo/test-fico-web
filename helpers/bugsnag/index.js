import React from "react"
import Bugsnag from "@bugsnag/js"
import BugsnagPluginReact from "@bugsnag/plugin-react"
import { useAuth } from "../../contexts/auth"

setTimeout(() => {}).__proto__.unref = () => {}

if (!Bugsnag._client) {
  const ignoredErrors = [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications."
  ]

  Bugsnag.start({
    apiKey: "aad08869c7acd9406928aec60a2baece",
    plugins: [new BugsnagPluginReact(React)],
    onError: event => {
      const { errors: [{ errorMessage }]} = event
      if(ignoredErrors.includes(errorMessage)) {
        return false
      }
      const { user: { displayName, email } } = useAuth()
      event.setUser(null, email, displayName)
    }
  })
}

const ErrorBoundary = Bugsnag.getPlugin("react")

export { ErrorBoundary as ErrorBoundary, Bugsnag }
