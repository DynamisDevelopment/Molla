const express = require('express')
require('./mongoose')

const {
  productRouter,
  reviewRouter,
  postRouter,
  commentRouter,
} = require('mt-routes-schemas')
const userRouter = require('./routers/users')
const localReviewRouter = require('./routers/reviews')

const app = express()

app.use(express.json())

// * External
app.use(userRouter)
app.use(productRouter)
app.use(reviewRouter)
app.use(postRouter)
app.use(commentRouter)

// * Local
app.use(localReviewRouter)

module.exports = app
