const express = require('express')
const { mongooseConnect } = require('mt-routes-schemas')

const {
  productRouter,
  reviewRouter,
  postRouter,
  commentRouter,
  miscRouter,
} = require('mt-routes-schemas')
const userRouter = require('./routers/users')
const localReviewRouter = require('./routers/reviews')
const localCommentRouter = require('./routers/comments')
const localMiscRouter = require('./routers/misc')

mongooseConnect('mollaTinker')

const app = express()
app.use(express.json())

// * External
app.use(userRouter)
app.use(productRouter)
app.use(reviewRouter)
app.use(postRouter)
app.use(commentRouter)
app.use(miscRouter)

// * Local
app.use(localReviewRouter)
app.use(localCommentRouter)
app.use(localMiscRouter)

module.exports = app
