import React from "react"

import Layout from "../templates/layout"
import SEO from "../templates/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>404: Страница не найдена</h1>
        </div>
        <div className="col-md-12">
          <p>
            Страница которую вы ищете, не найдена. Попробуйте использовать поиск
          </p>
        </div>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
