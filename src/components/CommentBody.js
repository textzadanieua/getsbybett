import React from "react"
import commentImg from "../images/comment-img.jpg"

const CommentBody = ({ name, content, addReply }) => {
  return (
    <article className="comment__body">
      <div className="comment__meta">
        <div className="comment__author">
          <img
            src={commentImg}
            alt={`${name} - Avatar`}
            loading="lazy"
            width="32"
            height="32"
          />
          <span className="comment__author-name">{name}</span>
        </div>
      </div>
      <div
        className="comment__content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className="comment__reply">
        <span className="reply_btn" onClick={addReply} aria-hidden="true">
          <i className="fas fa-reply"></i> Ответить
        </span>
      </div>
    </article>
  )
}

export default CommentBody
