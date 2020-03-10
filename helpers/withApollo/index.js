import { ApolloClient } from "apollo-boost"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import fetch from "node-fetch"
import { setContext } from "apollo-link-context"

const link = createHttpLink({
  uri: process.env.GRAPHQL_URI,
  fetch: fetch,
  credentials: "same-origin"
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  if(!token)
    return {}

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})

export function withApollo(Component) {
  return function(props) {
    return <Component {...props} client={client} />
  }
}
