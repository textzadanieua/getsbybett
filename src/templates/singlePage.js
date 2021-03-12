import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "./layout"
import Sidebar from "../components/Sidebar"
import SEO from "./seo"

const SinglePage = ({ data }) => {
  const page = data.wpPage

  return (
    <Layout>
      <SEO title={page.seo.title} description={page.seo.metaDesc} />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <main className="main-content">
              <h1 className="main-title">{page.title}</h1>
              {page.featuredImage?.node.localFile.childImageSharp.fluid && (
                <Img
                  className="single-post__image"
                  fluid={
                    page.featuredImage?.node.localFile.childImageSharp.fluid
                  }
                  alt={page.title.substring(0, 14)}
                />
              )}
              <div className="single-post__content text-style">
                <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
              </div>
            </main>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <Sidebar />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SinglePage

export const query = graphql`
  query SinglePageQuery($slug: String!) {
    wpPage(slug: { eq: $slug }) {
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
        }
      }
      content
      title
      seo {
        metaDesc
        title
        metaKeywords
      }
      status
    }
  }
`
