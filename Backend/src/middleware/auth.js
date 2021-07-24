const jwt = require('jsonwebtoken')
const User = require('../schemas/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) throw new Error('No user found')

    // * Clean up 1 expired token (Any more than one blocks the process)
    jwt.verify(
      user.tokens[0].token,
      process.env.TOKEN_SECRET,
      (err, decoded) => {
        if (err?.message === 'jwt expired') user.tokens.splice(0, 1)
      }
    )

    await user.save()
    req.token = token
    req.user = user
    next()
  } catch (err) {
    res.status(401).send(err)
  }
}

module.exports = auth
