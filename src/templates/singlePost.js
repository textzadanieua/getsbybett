import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "./layout"
import Breadcrumbs from "../components/Breadcrumbs"
import CommentList from "../components/CommentList"
import CommentForm from "../components/CommentForm"
import Sidebar from "../components/Sidebar"
import SEO from "./seo"

const SinglePost = ({ data }) => {
  const post = data.allWpPost.nodes[0]

  return (
    <Layout>
      <SEO title={post.seo.title} description={post.seo.metaDesc} />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumbs breadcrumbs={post.seo.breadcrumbs} />
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            <main className="main-content">
              <h1 className="main-title">{post.title}</h1>
              {post.featuredImage?.node.localFile.childImageSharp.fluid && (
                <Img
                  className="single-post__image"
                  fluid={
                    post.featuredImage?.node.localFile.childImageSharp.fluid
                  }
                  alt={post.title.substring(0, 14)}
                />
              )}
              <div className="single-post__meta">
                <span>
                  <i className="far fa-calendar-alt"></i>
                  {post.date}
                </span>
                <Link to={post.author.node.uri}>
                  <i className="fas fa-user-edit"></i>
                  {post.author.node.slug}
                </Link>
              </div>
              <div className="single-post__content text-style">
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
              </div>
            </main>
            <section className="comments-section">
              <CommentList postId={post.id} databasePostId={post.databaseId} />
              <CommentForm postId={post.databaseId} />
            </section>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <Sidebar />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SinglePost

export const query = graphql`
  query SinglePostQuery($slug: String!) {
    allWpPost(filter: { slug: { eq: $slug } }) {
      nodes {
        id
        databaseId
        title
        content
        date(formatString: "DD.MM.Y", locale: "RU")
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
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
        seo {
          title
          metaDesc
          breadcrumbs {
            url
            text
          }
        }
      }
    }
  }
`
