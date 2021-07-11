const { mongoose } = require('mt-routes-schemas')

const prod =
  'mongodb+srv://Cicero:Bigfoot3248@cluster0.hzjza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const test = 'mongodb://127.0.0.1:27017/mollaTinker'

mongoose.connect(test, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
