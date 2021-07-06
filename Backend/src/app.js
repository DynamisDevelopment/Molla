const express = require('express')
require('./mongoose')

const userRouter = require('./routers/users')

const app = express()

app.use(express.json())
app.use(userRouter)

module.exports = app