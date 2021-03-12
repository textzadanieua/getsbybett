import React from "react"
import { Link } from "gatsby"

const Pagination = ({
  pageSize,
  totalCount,
  currentPage,
  base,
  categoryType,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize)
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const hasNextPage = nextPage <= totalPages
  const hasPrevPage = prevPage >= 1

  const baseUrl = categoryType === "authors" ? `/author/${base}/` : `/${base}/`

  return (
    <div className="pagination-wrap">
      {hasPrevPage && <Link to={`${baseUrl}${prevPage}`}>&#8592;</Link>}

      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          key={`page${i}`}
          to={`${baseUrl}${i > 0 ? i + 1 : ""}`}
          className={currentPage === 1 && i === 0 ? "current" : ""}
        >
          {i + 1}
        </Link>
      ))}

      {hasNextPage && <Link to={`${baseUrl}${nextPage}`}>&#8594;</Link>}
    </div>
  )
}

export default Pagination
