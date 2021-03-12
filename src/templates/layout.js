import React from "react"
import PropTypes from "prop-types"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./styles/layout.css"

const Layout = ({ children }) => {
  return (
    <div id="main-wrap">
      <div id="content-wrap">
        <Header />
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
