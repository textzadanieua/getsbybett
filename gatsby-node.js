import path from "path"
// const { createFilePath } = require("gatsby-source-filesystem")

// --- Turn All Posts Into Pages
const postsIntoPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    query {
      allWpPost {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.error("There was an error fetching posts", result.errors)
  }

  const { allWpPost } = result.data

  if (allWpPost.nodes.length) {
    allWpPost.nodes.forEach(node => {
      actions.createPage({
        path: node.slug,
        component: path.resolve("./src/templates/singlePost.js"),
        context: {
          slug: node.slug,
        },
      })
    })
  }
}

// --- Turn All Posts Into !Search! Pages
const postsIntoSearchIndex = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    query {
      allWpPost {
        nodes {
          id
          title
          excerpt
          slug
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.error("There was an error fetching posts", result.errors)
  }

  const { allWpPost } = result.data
  let allThePosts = []

  if (allWpPost.nodes.length) {
    allWpPost.nodes.map(post => {
      let postData = post

      postData.categoriesData = []
      postData.categories.nodes.map(category => {
        postData.categoriesData.push(category.name)
      })

      allThePosts.push(postData)
    })
  }

  if (allThePosts.length > 0) {
    actions.createPage({
      path: `/search`,
      component: path.resolve("./src/templates/clientSearchTemplate.js"),
      context: {
        postSearchData: {
          allPosts: allThePosts,
          options: {
            indexStrategy: `Prefix match`,
            searchSanitizer: `Lower Case`,
            TitleIndex: true,
            AuthorIndex: true,
            CategoryIndex: true,
            SearchByTerm: true,
          },
        },
      },
    })
  }
}

// --- Turn Categories Into Pages
const categoriesIntoPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      allWpCategory {
        nodes {
          slug
          count
        }
      }
    }
  `)

  if (result.errors) {
    reporter.error("There was an error fetching category", result.errors)
  }

  const { allWpCategory } = result.data

  let pageCount
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)

  if (allWpCategory.nodes.length) {
    allWpCategory.nodes.forEach(node => {
      actions.createPage({
        path: node.slug,
        component: path.resolve("./src/templates/category.js"),
        context: {
          slug: node.slug,
          pageSize,
        },
      })
    })
  }

  if (allWpCategory.nodes.length) {
    allWpCategory.nodes.map(node => {
      pageCount = Math.ceil(node.count / pageSize)

      if (node.count !== null) {
        Array.from({ length: pageCount }).forEach((_, i) => {
          actions.createPage({
            path: `/${node.slug}/${i + 1}`,
            component: path.resolve("./src/templates/category.js"),
            context: {
              slug: node.slug,
              skip: i * pageSize,
              currentPage: i + 1,
              pageSize,
              pageCount,
            },
          })
        })
      }
    })
  }
}

// --- Turn Users Into Pages
const authorsIntoPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      allWpUser {
        nodes {
          slug
          uri
          posts {
            nodes {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.error("There was an error fetching users", result.errors)
  }

  const { allWpUser } = result.data

  let pageCount
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE)

  if (allWpUser.nodes.length) {
    allWpUser.nodes.forEach(node => {
      actions.createPage({
        path: node.uri,
        component: path.resolve("./src/templates/authors.js"),
        context: {
          slug: node.slug,
          pageSize,
        },
      })
    })

    allWpUser.nodes.map(node => {
      pageCount = Math.ceil(node.posts.nodes.length / pageSize)

      if (pageCount !== null) {
        Array.from({ length: pageCount }).forEach((_, i) => {
          actions.createPage({
            path: `${node.uri}${i + 1}`,
            component: path.resolve("./src/templates/authors.js"),
            context: {
              slug: node.slug,
              skip: i * pageSize,
              currentPage: i + 1,
              pageSize,
              pageCount,
            },
          })
        })
      }
    })
  }
}

// --- Turn All WP-Pages Into Gatsby-Pages
const pagesIntoPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    query {
      allWpPage(filter: { isFrontPage: { ne: true } }) {
        nodes {
          title
          slug
          isFrontPage
        }
      }
    }
  `)

  if (result.errors) {
    reporter.error("There was an error fetching pages", result.errors)
  }

  const { allWpPage } = result.data

  if (allWpPage.nodes.length) {
    allWpPage.nodes.forEach(node => {
      actions.createPage({
        path: node.slug,
        component: path.resolve("./src/templates/singlePage.js"),
        context: {
          slug: node.slug,
        },
      })
    })
  }
}

export async function createPages(params) {
  // Create Pages dynamically

  await Promise.all([
    postsIntoPages(params),
    postsIntoSearchIndex(params),
    categoriesIntoPages(params),
    authorsIntoPages(params),
    pagesIntoPages(params),
  ])
}

// *** FOR MARKDOWN CREATE PAGES ***
// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === "MarkdownRemark") {
//     const slug = createFilePath({ node, getNode, basePath: "articles" })
//     createNodeField({
//       node,
//       name: "slug",
//       value: slug,
//     })
//   }
// }
// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   return graphql(`
//     {
//       allMarkdownRemark {
//         nodes {
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   `).then(result => {
//     result.data.allMarkdownRemark.nodes.forEach(node => {
//       createPage({
//         path: node.fields.slug,
//         component: path.resolve("./src/templates/singlePost.js"),
//         context: {
//           slug: node.fields.slug,
//         },
//       })
//     })
//   })
// }
