// const { mongoose } = require('mt-routes-schemas')
const app = require('./app')

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`running on port: ${port}`))
