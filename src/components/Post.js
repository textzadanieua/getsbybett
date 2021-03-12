import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Post = ({ postData, categoryType, home }) => {
  return (
    <div className={`flex-item ${home && "home"}`}>
      <div className="flex-item__child">
        {postData.featuredImage?.node.localFile.childImageSharp.fluid && (
          <Img
            className="flex-item__child-image"
            fluid={postData.featuredImage?.node.localFile.childImageSharp.fluid}
            alt={postData.title.substring(0, 14)}
          />
        )}
        <div className="flex-item__child-body">
          <div className="flex-item__child-meta">
            <span>
              <i className="far fa-calendar-alt"></i>
              {postData.date}
            </span>
            {categoryType && (
              <Link to={postData.author.node.uri}>
                <i className="fas fa-user-edit"></i>
                {postData.author.node.slug}
              </Link>
            )}
          </div>
          <h3
            className="flex-item__child-title"
            dangerouslySetInnerHTML={{ __html: postData.title }}
          />
          <p
            className="flex-item__child-text"
            dangerouslySetInnerHTML={{ __html: postData.excerpt }}
          />
          <div className="flex-item__child-footer">
            <Link className="btn btn-primary" to={`/${postData.slug}`}>
              Читать дальше
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
