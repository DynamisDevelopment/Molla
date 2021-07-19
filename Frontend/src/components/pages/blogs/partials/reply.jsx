import React, { useState } from 'react'
import axios from 'axios'

function Reply({ postId, setComments }) {
  const [body, setBody] = useState('')
  const [name, setName] = useState('')

  const sendComment = e => {
    e.preventDefault()
    const comment = {
      name,
      body,
      image: `assets/images/blog/comments/1.jpg`,
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/post/${postId}/comment`, comment)
      .then(res => setComments(prev => [...prev, { ...res.data }]))
      .catch(err => console.log(err))

    setBody('')
    setName('')
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
          onInput={e => setBody(e.target.value.trim())}
          value={body}
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
              onInput={e => setName(e.target.value.trim())}
              value={name}
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
