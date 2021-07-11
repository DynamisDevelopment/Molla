const express = require('express')
require('./mongoose')

const {
  productRouter,
  reviewRouter,
  postRouter,
  commentRouter,
} = require('mt-routes-schemas')
const userRouter = require('./routers/users')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use(reviewRouter)
app.use(postRouter)
app.use(commentRouter)

module.exports = app
