import React, { useState } from 'react'
import axios from 'axios'

function Reply({ postId, setComments }) {
  const [body, setBody] = useState()
  const [name, setName] = useState()

  const sendComment = () => {
    setComments(prev => [
      ...prev,
      {
        _id: '60f3178c9702683e902a491b',
        title: 'This post sucks',
        name: name,
        body,
        createdAt: '2021-07-17T17:46:52.571Z',
        updatedAt: '2021-07-17T17:46:52.571Z',
        __v: 0,
      },
    ])
  }

  return (
    <div className="reply">
      <div className="heading">
        <h3 className="title">Leave A Reply</h3>
        <p className="title-desc">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>

      <form action="#">
        <label htmlFor="reply-message" className="sr-only">
          Comment
        </label>
        <textarea
          name="reply-message"
          id="reply-message"
          cols="30"
          rows="4"
          className="form-control"
          required
          placeholder="Comment *"
        ></textarea>

        <div className="row">
          <div className="col-md-12">
            <label htmlFor="reply-name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="reply-name"
              name="reply-name"
              required
              placeholder="Name *"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary-2"
          onClick={sendComment}
        >
          <span>POST COMMENT</span>
          <i className="icon-long-arrow-right"></i>
        </button>
      </form>
    </div>
  )
}

export default React.memo(Reply)
