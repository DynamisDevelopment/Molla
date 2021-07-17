import React from 'react'
import Comment from './comment'

function Comments({ comments }) {
  return (
    <div className="comments">
      <h3 className="title">{comments.length} Comments</h3>
      <ul>
        {comments.map((comment, i) => (
          <li key={i}>
            <Comment
              image={`assets/images/blog/comments/1.jpg`}
              name="Jimmy Pearson"
              date={comment.createdAt}
              content={comment.body}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
