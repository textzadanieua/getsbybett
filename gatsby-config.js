import dotenv from "dotenv"
dotenv.config({ path: ".env" })

export default {
  siteMetadata: {
    title: `Getsby`,
    description: `Best Gatsby Website`,
    author: `@gatsbyjs`,
    siteURL: `${process.env.GATSBY_URL}`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    // {
    //   resolve: `gatsby-source-graphql`,
    //   options: {
    //     // This type will contain remote schema Query type
    //     typeName: `WPGraphQL`,
    //     // This is field under which it's accessible
    //     fieldName: `wpgraphql`,
    //     // Url to query from
    //     url: `${process.env.GATSBY_WP_ENDPOINT}`,
    //   },
    // },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * The full URL of the WordPress site's GraphQL API.
         * Example : 'https://www.example-site.com/graphql'
         */
        url: `${process.env.GATSBY_WP_ENDPOINT}`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
