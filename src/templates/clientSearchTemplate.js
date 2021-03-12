import React, { useState, useEffect } from "react"
import queryString from "query-string"
import Layout from "./layout"
import SEO from "./seo"
import ClientSearch from "../components/ClientSearch"

const SearchTemplate = props => {
  const { pageContext } = props
  const { postSearchData } = pageContext
  const { allPosts, options } = postSearchData

  const [locationSearch, setLocationSearch] = useState("")

  useEffect(() => {
    let parsed = queryString.parse(props.location.search)
    setLocationSearch(parsed.q)
    return () => {
      setLocationSearch("")
    }
  }, [props.location.search])

  return (
    <Layout>
      <SEO />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <main className="main-content search-page">
              <ClientSearch
                posts={allPosts}
                engine={options}
                locationsSearch={locationSearch}
              />
            </main>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SearchTemplate
