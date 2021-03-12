import React from "react"
import { Link } from "gatsby"
import { flatListToHierarchical } from "../utils/utils"

const Navline = ({ menuItems }) => {
  const navItems = flatListToHierarchical(menuItems, {
    idKey: "id",
    childrenKey: "children",
    parentKey: "parentId",
  })

  const NavTree = navItems => {
    let items = navItems.map(navItem => (
      <li className={`menu-item parent lev-1`} key={navItem.id}>
        <Link to={navItem.url}>{navItem.label}</Link>
        {navItem.children.length > 0 && (
          <ol className={`children-list lev-2`}>
            {navItem.children.map(navSecLev => (
              <li className={`menu-item parent lev-2`} key={navSecLev.id}>
                <Link to={navSecLev.url}>{navSecLev.label}</Link>
              </li>
            ))}
          </ol>
        )}
      </li>
    ))

    return items
  }

  return <ul className="menu">{NavTree(navItems)}</ul>
}

export default Navline
