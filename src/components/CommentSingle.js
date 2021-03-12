import React, { useState } from "react"
import CommentBody from "./CommentBody"
import CommentForm from "./CommentForm"

const CommentSingle = ({
  name,
  content,
  commentDatabaseId,
  databasePostId,
}) => {
  const [replying, setReplying] = useState(false)

  const addReply = () => {
    setReplying(true)
  }
  const removeReply = () => {
    setReplying(false)
  }

  return (
    <React.Fragment>
      <CommentBody name={name} content={content} addReply={addReply} />
      {replying && (
        <CommentForm
          postId={databasePostId}
          parentId={commentDatabaseId}
          formTitle={name}
          removeReply={removeReply}
        />
      )}
    </React.Fragment>
  )
}

export default CommentSingle
