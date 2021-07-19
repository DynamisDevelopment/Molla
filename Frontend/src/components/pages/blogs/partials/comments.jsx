import React from 'react'
import Comment from './comment'

function Comments({ comments }) {
  return (
    <div className="comments">
      <h3 className="title">{comments.length} Comments</h3>
      {comments && (
        <ul>
          {comments.map((comment, i) => (
            <li key={i}>
              <Comment
                image={comment.image}
                name={comment.name}
                date={comment.createdAt}
                content={comment.body}
              />
              {comment.replies && (
                <ul>
                  {comment.replies.map((reply, j) => (
                    <Comment
                      image={reply.image}
                      name={reply.name}
                      date={reply.createdAt}
                      content={reply.body}
                      key={j}
                    />
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Comments
