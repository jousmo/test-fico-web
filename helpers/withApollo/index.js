import { ApolloClient } from "apollo-boost"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import fetch from "node-fetch"
import { setContext } from "apollo-link-context"
import { parseCookies } from "nookies"

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
  fetch: fetch
})

const authLink = setContext((_, { headers }) => {
  const { token } = parseCookies()

  if(!token)
    return {}

  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({
    addTypename: false
  })
})

export function withApollo(Component) {
  return function(props) {
    return <Component {...props} client={client} />
  }
}
