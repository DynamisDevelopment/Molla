const mongoose = require('mongoose')

const prod =
  'mongodb+srv://TaskApp:uEYawJRSHnV2GNcE@cluster0.wofxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const test = 'mongodb://127.0.0.1:27017/molla'

mongoose.connect(test, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
