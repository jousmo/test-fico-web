import { Bugsnag } from "./index"
import { warning } from "../alert"

export const apolloError = err => {
  const { graphQLErrors, networkError } = err
  let messages = []

  warning()
  if (!!graphQLErrors?.length) {
    messages = graphQLErrors?.reduce((prev, current) => [...prev, current.message], [])
  } else {
    const { result: { errors } = {} } = networkError
    messages = errors?.reduce((prev, current) => [...prev, current.message], [])
  }

  Bugsnag.notify(new Error(messages))
  console.error(messages)
}
