import React, { Fragment } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Breadcrumbs = ({ breadcrumbs }) => {
  const { site } = useStaticQuery(graphql`
    query UrlQuery {
      site {
        siteMetadata {
          siteURL
        }
      }
    }
  `)

  const breadsLength = breadcrumbs.length

  return (
    <ol className="breadcrumbs">
      {breadcrumbs.map((bread, i) => {
        if (breadsLength !== i + 1) {
          return (
            <Fragment key={bread.text}>
              <li property="itemListElement" typeof="ListItem">
                <Link
                  to={bread.url}
                  property="item"
                  typeof="WebPage"
                  title={bread.text}
                >
                  <span property="name">{bread.text}</span>
                </Link>
                <meta property="position" content={i + 1} />
              </li>
              {"»"}
            </Fragment>
          )
        } else {
          return (
            <Fragment key={bread.text}>
              <li property="itemListElement" typeof="ListItem">
                <span property="name">{bread.text}</span>
                <meta
                  property="url"
                  content={`${site.siteMetadata.siteURL}${bread.url}`}
                ></meta>
                <meta property="position" content={i + 1} />
              </li>
            </Fragment>
          )
        }
      })}
    </ol>
  )
}

export default Breadcrumbs
