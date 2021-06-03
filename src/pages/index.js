import React from "react"
import { graphql } from "gatsby"

import Layout from "../templates/layout"
import SEO from "../templates/seo"
import Post from "../components/Post"

const IndexPage = ({ data }) => {
  const posts = data.allWpPost.nodes
  const seoTitle = data.wpPage.title
  const seoDescr = data.wpPage.metaDesc
  const pageTitle = data.wpPage.title
  const pageContent = data.wpPage.content

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescr}
        meta={[
          {
            name: "google-site-verification",
            content: "OXxmxGSrMJr5UVj4WL5OPMKXz7WO97fNpYAaHjBjikY",
          },
        ]}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="main-title">{pageTitle}</h1>
          </div>
          <div className="col-md-12">
            <div className="row">
              {posts &&
                posts.map(post => (
                  <Post
                    postData={post}
                    categoryType={true}
                    key={post.id}
                    home={true}
                  />
                ))}
            </div>
          </div>
          <div className="col-md-12">
            <main
              className="main-content text-style"
              dangerouslySetInnerHTML={{ __html: pageContent }}
            ></main>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Wordpress Query
export const pageQuery = graphql`
  query {
    wpPage(isFrontPage: { eq: true }) {
      seo {
        title
        metaDesc
      }
      title
      content
    }
    allWpPost(sort: { fields: [date], order: DESC }, limit: 6) {
      nodes {
        id
        title
        excerpt
        slug
        date(formatString: "DD.MM.Y", locale: "RU")
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        author {
          node {
            slug
            uri
          }
        }
      }
    }
  }
`

// *** MARKDOWN Query ***
// export const query = graphql`
//   query MyQuery {
//     allMarkdownRemark {
//       nodes {
//         id
//         fields {
//           slug
//         }
//         frontmatter {
//           title
//           image
//           date
//         }
//         excerpt
//         html
//       }
//     }
//   }
// `

export default IndexPage
