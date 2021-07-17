const express = require('express')
const Review = require('mt-routes-schemas').Review
const { complete, forbiddenUpdates } = require('mt-routes-schemas')

const router = new express.Router()

router.post('/review/:id/helpful', async (req, res) => {
  const review = await Review.findById(req.params.id)

  complete(async () => {
    review.helpful = review.helpful + 1
    review.save()
    res.send(review)
  }, res)
})

router.post('/review/:id/unhelpful', async (req, res) => {
  const review = await Review.findById(req.params.id)

  complete(async () => {
    review.unhelpful = review.unhelpful + 1
    review.save()
    res.send(review)
  }, res)
})

module.exports = router
