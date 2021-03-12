import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const RecentPosts = () => {
  const data = useStaticQuery(graphql`
    query RecentPostsQuery {
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
                  fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const posts = data.allWpPost.nodes

  return (
    <section className="sidebar-section recent-posts">
      <h3 className="recent-posts__title">Свежие записи</h3>
      <div className="recent-posts__wrap">
        {posts.length > 0 &&
          posts.map(post => (
            <div className="recent-posts__item" key={post.id}>
              <div className="recent-posts__item-image">
                {post.featuredImage?.node.localFile.childImageSharp.fluid && (
                  <Img
                    className="recent-posts__item-image-img"
                    fluid={
                      post.featuredImage?.node.localFile.childImageSharp.fluid
                    }
                    alt={post.title}
                  />
                )}
              </div>
              <div className="recent-posts__item-content">
                <Link className="recent-posts__item-title" to={`/${post.slug}`}>
                  {post.title}
                </Link>
                <div className="recent-posts__item-meta">
                  <span>
                    <i className="far fa-calendar-alt"></i>
                    {post.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default RecentPosts
