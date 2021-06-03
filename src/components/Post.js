import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Post = ({ postData, categoryType, home }) => {
  return (
    <div className={`flex-item ${home && "home"}`}>
      <div className="flex-item__child">
        {postData.featuredImage?.node.localFile.childImageSharp.fluid && (
          <Link to={`/${postData.slug}`}>
            <Img
              className="flex-item__child-image"
              fluid={
                postData.featuredImage?.node.localFile.childImageSharp.fluid
              }
              alt={postData.title.substring(0, 14)}
            />
          </Link>
        )}
        <div className="flex-item__child-body">
          <div className="flex-item__child-meta">
            <span>
              <i className="far fa-calendar-alt"></i>
              {postData.date}
            </span>
          </div>
          <Link to={`/${postData.slug}`}>
            <h3
              className="flex-item__child-title"
              dangerouslySetInnerHTML={{ __html: postData.title }}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Post
