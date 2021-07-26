const request = require('supertest')
const app = require('../app')
const User = require('../schemas/user')
const { setupDB } = require('../utils')
const { userOne, userTwo } = require('mt-routes-schemas')

beforeEach(setupDB)

const currentUser = async () => {
  const current = await request(app).post('/user').send(userTwo).expect(200)
  return current.body
}

describe('Products', () => {
  test('Add a new User', async () => {
    const res = await request(app).post('/user').send(userTwo).expect(200)

    const user = await User.findById(res.body.user._id)

    expect(user).not.toBeNull()
    expect(user.name).toEqual('Deez Nutz')
  })

  test('Gets all users', async () => {
    const res = await User.find()

    expect(res.length).toEqual(1)
  })

  test('Gets specific user and populates orders', async () => {
    const { token } = await currentUser()

    const res = await request(app)
      .get(`/user/me`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    // TODO add order population
    expect(res.body).not.toBeNull()
  })

  test('Delete User and related Orders', async () => {
    const { user, token } = await currentUser()

    await request(app)
      .delete(`/user/me`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const deleted = await User.findById(user._id)
    expect(deleted).toBeNull()
  })

  test('Updates User', async () => {
    const { token } = await currentUser()

    const res = await request(app)
      .patch(`/user/me`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Someone Else',
      })
      .expect(200)

    expect(res.body.name).toEqual('Someone Else')
  })

  test('Logs in User', async () => {
    const res = await request(app)
      .post(`/user/login`)
      .send({
        username: userOne.username,
        password: userOne.password,
      })
      .expect(200)

    expect(res.body.token).not.toBeNull()
    expect(res.body.user.tokens.length).toBeGreaterThan(0)
  })

  test('Logs out User', async () => {
    const { token } = await currentUser()

    const res = await request(app)
      .post(`/user/logout`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(res.body.token).toBeFalsy()
    expect(res.body.tokens.length).toEqual(0)
  })
})
