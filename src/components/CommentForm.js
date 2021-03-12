import React, { useState } from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import useForm from "../utils/useForm"

const commentSubmitQuery = gql`
  mutation(
    $author: String
    $commentOn: Int
    $content: String
    $authorEmail: String
    $parent: ID = null
  ) {
    createComment(
      input: {
        clientMutationId: "CreateComment"
        commentOn: $commentOn
        author: $author
        authorEmail: $authorEmail
        content: $content
        parent: $parent
      }
    ) {
      success
    }
  }
`

const CommentForm = ({ postId, parentId, formTitle, removeReply }) => {
  const [commentStatus, setCommentStatus] = useState("")
  const parentToReply = parentId ? parentId : null

  const { values, updateValues, onSubmitUseForm } = useForm({
    author: "",
    email: "",
    comment: "",
    mapPrev: "",
  })

  return (
    <div className="comment-respond">
      {formTitle ? (
        <h3 className="comment-respond__title">
          <i className="fas fa-reply-all"></i> Ответить {formTitle}{" "}
          <small>
            <span
              onClick={removeReply}
              aria-hidden="true"
              className="cancel_reply"
            >
              Cancel reply <i className="fas fa-times"></i>
            </span>
          </small>
        </h3>
      ) : (
        <h3 className="comment-respond__title">
          <i className="fas fa-reply-all"></i> Оставить отзыв
        </h3>
      )}

      {commentStatus === "error" && (
        <p className="error">
          Случилась ошибка при отправки. Попробуйте позже.
        </p>
      )}

      {commentStatus === "loading" && (
        <p>Подождите, ваш коментарий отправляется</p>
      )}

      {commentStatus === "success" && (
        <p className="success">
          Ваш коментарий успешно отправлен. После модерации ваш коментарий
          станет видимый.
        </p>
      )}

      {commentStatus !== "loading" && (
        <Mutation
          mutation={commentSubmitQuery}
          onCompleted={() => {
            setCommentStatus("success")
          }}
          // Set error state.
          onError={() => {
            setCommentStatus("error")
          }}
        >
          {addComment => (
            <form
              className="comment-form"
              onSubmit={event => {
                event.preventDefault()

                if (values.mapPrev.length > 0) {
                  setCommentStatus("error")
                  return
                }

                setCommentStatus("loading")

                addComment({
                  variables: {
                    commentOn: postId,
                    author: values.author,
                    authorEmail: values.email,
                    content: values.comment,
                    parent: parentToReply,
                  },
                })

                onSubmitUseForm()
              }}
            >
              <p className="comment-form-author">
                <label htmlFor="author">Имя</label>
                <input
                  name="author"
                  type="text"
                  value={values.author}
                  onChange={updateValues}
                  required
                />
              </p>
              <p className="comment-form-email">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={updateValues}
                  required
                />
              </p>
              <p className="comment-form-comment">
                <label htmlFor="comment">Коментарий</label>
                <textarea
                  name="comment"
                  value={values.comment}
                  onChange={updateValues}
                  required
                />
              </p>
              <input
                type="text"
                name="mapPrev"
                className="mapPrevdisp"
                onChange={updateValues}
              />
              <p className="form-submit">
                <input
                  name="submit"
                  type="submit"
                  value="Отправить"
                  className="btn btn-primary"
                />
              </p>
            </form>
          )}
        </Mutation>
      )}
    </div>
  )
}

export default CommentForm
