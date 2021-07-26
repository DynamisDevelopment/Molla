const express = require('express')
const User = require('../schemas/user')
const auth = require('../middleware/auth')
const { complete, forbiddenUpdates } = require('mt-routes-schemas')
const { sendWelcomeEmail } = require('../emails/account')

const router = new express.Router()

router.post('/user', async (req, res) => {
  const user = new User(req.body)

  const token = await user.generateAuthToken()

  complete(async () => {
    user.save()
    sendWelcomeEmail(user.email, user.name)
    res.send({ user, token })
  }, res)
})

router.get('/user', async (req, res) => {
  const users = await User.find()

  complete(() => res.send(users), res)
})

router.post('/user/login', async (req, res) => {
  complete(async () => {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.username,
      req.body.password
    )
    const token = await user.generateAuthToken()

    res.send({ user, token })
  }, res)
})

router.post('/user/logout', auth, async (req, res) => {
  complete(async () => {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.send(req.user)
  }, res)
})

router.get('/user/me', auth, async (req, res) =>
  complete(() => res.send(req.user), res)
)

router.patch('/user/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  forbiddenUpdates(req.body, res, [
    'createdAt',
    'updatedAt',
    '_id',
    'orders',
    'tokens',
  ])

  complete(async () => {
    const user = await User.findById(req.user.id)
    if (!user) res.status(404).send('No User Found')

    updates.forEach(update => (user[update] = req.body[update]))

    await user.save()
    res.send(user)
  }, res)
})

router.delete('/user/me', auth, async (req, res) => {
  complete(async () => {
    await req.user.remove()
    res.send(req.user)
  }, res)
})

module.exports = router
