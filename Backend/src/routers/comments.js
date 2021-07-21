const express = require('express')
const Comment = require('mt-routes-schemas').Comment
const { complete } = require('mt-routes-schemas')

const router = new express.Router()

router.post('/comment/:id/reply', async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  complete(async () => {
    const reply = await new Comment(req.body)
    comment.replies.push(reply)
    reply.save()
    comment.save()
    res.send(comment)
  }, res)
})

module.exports = router
