/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import fetch from "isomorphic-fetch"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./src/main.sass"

// Wraps the entire Gatsby app with Apollo.
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
