/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from "react"
import fetch from "isomorphic-fetch"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

export const wrapRootElement = ({ element }) => {
  // Register a new Apollo client.
  const client = new ApolloClient({
    fetch,
    // Change this to your GraphQL endpoint.
    // uri: process.env.GATSBY_WP_ENDPOINT,
    uri: `${process.env.GATSBY_WP_ENDPOINT}`,
  })

  // Wrap the element.
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
