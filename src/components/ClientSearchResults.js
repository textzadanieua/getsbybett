import React from "react"
// import { isEmpty } from 'lodash';
import Link from "gatsby-link"
import { sanitize } from "../utils/functions"

const SearchResults = ({ queryResults }) => {
  if (queryResults.length < 1) {
    return null
  }

  return (
    <div className="search-results">
      {queryResults.map(post => (
        <div key={post.id} className="search-post">
          <Link to={`/${post.slug}`} className="search-post__title">
            <span dangerouslySetInnerHTML={{ __html: sanitize(post.title) }} />
          </Link>
          <p
            className="search-post__excerpt"
            dangerouslySetInnerHTML={{ __html: sanitize(post.excerpt) }}
          ></p>
        </div>
      ))}
    </div>
  )
}

export default SearchResults
