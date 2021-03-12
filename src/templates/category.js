import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import Post from "../components/Post"
import Pagination from "../components/Pagination"
import Breadcrumbs from "../components/Breadcrumbs"
import Sidebar from "../components/Sidebar"
import SEO from "./seo"

const Category = ({ data, pageContext }) => {
  const category = data.allWpCategory.nodes[0]

  const titleSeo = category.seo.title
  const metaDesc = category.seo.metaDesc
  const breadcrumbs = category.seo.breadcrumbs
  const categoryName = category.name
  const totalCount = category.count
  const categorySlug = category.slug

  const posts = data.allWpPost.nodes
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)

  const paginationTitle =
    pageContext.currentPage > 1
      ? ` - Page ${pageContext.currentPage} of ${pageContext.pageCount}`
      : ""

  return (
    <Layout>
      <SEO title={`${titleSeo} ${paginationTitle}`} description={metaDesc} />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          {posts.length ? (
            <>
              <div className="col-lg-8 col-md-12 col-sm-12">
                <main className="main-content">
                  <h1 className="main-title">{categoryName}</h1>
                  <div className="row">
                    {posts.map(post => (
                      <Post postData={post} categoryType={true} key={post.id} />
                    ))}
                    {totalCount > pageSize && (
                      <Pagination
                        totalCount={totalCount}
                        pageSize={pageSize}
                        currentPage={pageContext.currentPage || 1}
                        skip={pageContext.skip}
                        base={categorySlug}
                        categoryType="category"
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
            <>
              <div className="col-md-8">
                <section className="not-found">
                  <h1>Nothing Found</h1>
                </section>
              </div>
              <div className="col-md-4">
                <Sidebar />
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Category

export const query = graphql`
  query CategoryQuery($slug: String!, $pageSize: Int = 1, $skip: Int = 0) {
    allWpCategory(filter: { slug: { eq: $slug } }) {
      nodes {
        seo {
          title
          metaDesc
          breadcrumbs {
            text
            url
          }
        }
        name
        count
        slug
      }
    }
    allWpPost(
      sort: { fields: [date], order: DESC }
      filter: { categories: { nodes: { elemMatch: { slug: { eq: $slug } } } } }
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
