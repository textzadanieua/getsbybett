import React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { flatListToHierarchical } from "../utils/utils"
import CommentSingle from "./CommentSingle"

const CommentList = ({ postId, databasePostId }) => {
  return (
    <Query query={commentQuery} variables={{ postId }}>
      {({ loading, error, data }) => {
        // Loading and error messages.
        if (loading) return "Загрузка коментариев..."
        if (error) return "Ошибка загрузки коментариев..."

        // Display message if there are no comments to show.
        if (data.post.comments.nodes.length < 1)
          return (
            <div className="comments-wrap">
              <span className="comments-wrap__title">
                <i className="far fa-comment-dots"></i> У этой записи еще нет
                коментариев
              </span>
            </div>
          )

        const commentItems = flatListToHierarchical(data.post.comments.nodes, {
          idKey: "id",
          childrenKey: "children",
          parentKey: "parentId",
        })

        const CommentTree = comments => {
          let items = comments.map(comment => {
            return (
              <li className="comment parent" key={comment.id}>
                <CommentSingle
                  name={comment.author.node.name}
                  content={comment.content}
                  commentDatabaseId={comment.databaseId}
                  databasePostId={databasePostId}
                />
                {comment.children && (
                  <ol className="children">{CommentTree(comment.children)}</ol>
                )}
              </li>
            )
          })

          return items
        }

        return (
          <div className="comments-wrap">
            <h3 className="comments-wrap__title">
              <i className="far fa-comment-dots"></i> Коментарии
            </h3>
            <ol className="comment-list">{CommentTree(commentItems)}</ol>
          </div>
        )
      }}
    </Query>
  )
}

export default CommentList

const commentQuery = gql`
  query($postId: ID!) {
    post(id: $postId, idType: ID) {
      comments(where: { contentStatus: PUBLISH }) {
        nodes {
          id
          parentId
          databaseId
          date
          author {
            node {
              name
            }
          }
          content
        }
      }
    }
  }
`
