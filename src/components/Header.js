import React, { useState } from "react"
import { Link } from "gatsby"
import Navline from "./Navline"
import { useStaticQuery, graphql } from "gatsby"
import SearchNavForm from "./SearchNavForm"
import logo from "../images/gatsby-icon.png"

const Header = () => {
  const data = useStaticQuery(graphql`
    query headerQuery {
      wpMenu(locations: { eq: MENU_1 }) {
        menuItems {
          nodes {
            label
            url
            id
            parentId
          }
        }
      }
    }
  `)
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  const openMenuSearch = () => {
    setOpenMenu(!openMenu)
    setOpenSearch(true)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrap">
          <div className="header-logo">
            <Link to="/">
              <img src={logo} alt="Gatsby logo" width="50" />
            </Link>
          </div>
          <div className="header-mob-btn">
            <span
              className={`mob-btn ${openMenu && "active"}`}
              aria-hidden="true"
              onClick={openMenuSearch}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div className={`header-menu ${openMenu && "opened"}`}>
            <nav className="header-nav">
              <Navline menuItems={data.wpMenu.menuItems.nodes} />
              <span
                aria-hidden="true"
                className="search_btn"
                onClick={() => setOpenSearch(!openSearch)}
              >
                {!openSearch ? (
                  <i className="fas fa-search"></i>
                ) : (
                  <i className="fas fa-times"></i>
                )}
              </span>
            </nav>
            {openSearch && <SearchNavForm />}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
