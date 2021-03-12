import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import Post from "../components/Post"
import Pagination from "../components/Pagination"
import Sidebar from "../components/Sidebar"
import Breadcrumbs from "../components/Breadcrumbs"
import SEO from "./seo"

const Authors = ({ data, pageContext }) => {
  const user = data.allWpUser.nodes[0]
  const userTitleSeo = user.seo.title
  const metaDesc = user.seo.metaDesc

  const authorName = user.name
  const authorDescr = user.description
  const authorNiceName =
    user.firstName && user.lastName && user.firstName + " " + user.lastName

  const posts = data.allWpPost.nodes
  const totalCount = user.posts.nodes.length
  const userUri = user.slug
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)

  let breadcrumbs = [
    { text: "Главная", url: "/" },
    { text: authorName, url: userUri },
  ]

  const paginationTitle =
    pageContext.currentPage > 1
      ? ` - Page ${pageContext.currentPage} of ${pageContext.pageCount}`
      : ""

  return (
    <Layout>
      <SEO
        title={`${userTitleSeo} ${paginationTitle}`}
        description={metaDesc}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          {posts.length ? (
            <>
              <div className="col-lg-8 col-md-12 col-sm-12">
                <main className="main-content">
                  <h1 className="main-title">
                    {authorNiceName ? authorNiceName : authorName}
                  </h1>
                  <p
                    className="category-description"
                    dangerouslySetInnerHTML={{ __html: authorDescr }}
                  />
                  <div className="row">
                    {posts.map(post => (
                      <Post postData={post} key={post.id} />
                    ))}
                    {totalCount > pageSize && (
                      <Pagination
                        totalCount={totalCount}
                        pageSize={pageSize}
                        currentPage={pageContext.currentPage || 1}
                        skip={pageContext.skip}
                        base={userUri}
                        categoryType="authors"
                      />
                    )}
                  </div>
                </main>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <Sidebar />
              </div>
            </>
          ) : (
            <div className="col-md-12">
              <h3>Nothing Found</h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Authors

export const query = graphql`
  query AuthorsQuery($slug: String!, $pageSize: Int = 1, $skip: Int = 0) {
    allWpUser(filter: { slug: { eq: $slug } }) {
      nodes {
        name
        description
        firstName
        lastName
        slug
        posts {
          nodes {
            slug
          }
        }
        seo {
          title
          metaDesc
        }
      }
    }
    allWpPost(
      sort: { fields: [date], order: DESC }
      filter: { author: { node: { slug: { eq: $slug } } } }
      limit: $pageSize
      skip: $skip
    ) {
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
