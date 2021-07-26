const express = require('express')
const mongoose = require('mongoose')
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

mongooseConnect(process.env.MONGODB_URL)
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

const app = express()
app.use(express.json())

// * External
app.use(productRouter)
app.use(reviewRouter)
app.use(postRouter)
app.use(commentRouter)
app.use(miscRouter)

// * Local
app.use(userRouter)
app.use(localReviewRouter)
app.use(localCommentRouter)
app.use(localMiscRouter)

module.exports = app
