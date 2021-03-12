/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ title, description, lang, meta, keywords }) {
  const { site, allWp } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        allWp {
          nodes {
            generalSettings {
              title
              description
              language
            }
          }
        }
      }
    `
  )

  const WPTitle = allWp.nodes[0].generalSettings.title
  const WPDescription = allWp.nodes[0].generalSettings.description
  const WPlanguage = allWp.nodes[0].generalSettings.language

  const defaultTitle = WPTitle ? WPTitle : site.siteMetadata?.title
  const metaDescription =
    description || WPDescription || site.siteMetadata.description
  const language = lang || WPlanguage

  return (
    <Helmet
      htmlAttributes={{
        language,
      }}
      title={title || defaultTitle}
      // titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      titleTemplate={title ? `%s` : defaultTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords && keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
