import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Navline from "./Navline"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      wpMenu(locations: { eq: FOOTER }) {
        menuItems {
          nodes {
            label
            url
            id
          }
        }
      }
      allWp {
        nodes {
          generalSettings {
            title
          }
        }
      }
    }
  `)

  return (
    <footer id="footer-wrap" className="footer">
      <div className="container">
        <nav className="footer__nav">
          <Navline menuItems={data.wpMenu.menuItems.nodes} />
        </nav>
        <div className="footer__copy">
          &copy; {new Date().getFullYear()}{" "}
          {data.allWp.nodes[0].generalSettings.title}
        </div>
      </div>
    </footer>
  )
}

export default Footer
