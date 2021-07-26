const request = require('supertest')
const User = require('./schemas/user')
const { userOne, setupDatabase } = require('mt-routes-schemas')

const setupDB = async () => {
  await User.deleteMany({})

  await setupDatabase()

  await new User(userOne).save()
}

module.exports = {
  setupDB,
}
