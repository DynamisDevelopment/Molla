import React from 'react'
import { Link } from 'react-router-dom'

function Comment(props) {
  const { image, name, date, content, key } = props

  return (
    <div className="comment" key={key && key}>
      <figure className="comment-media">
        <Link to="#">
          <img src={image} alt="User name" />
        </Link>
      </figure>

      <div className="comment-body">
        <Link to="#" className="comment-reply">
          Reply
        </Link>
        <div className="comment-user">
          <h4>
            <Link to="#">{name}</Link>
          </h4>
          <span className="comment-date">{date}</span>
        </div>

        <div className="comment-content">
          <p>{content}</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Comment)
