const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate(val) {
        if (!validator.isEmail(val)) throw new Error('Email is invalid')
      },
    },
    picture: Buffer,
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
    },
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Order',
    },
    billingAddress: {
      name: String,
      addressOne: String,
      addressTwo: String,
      phone: String,
      email: String,
    },
    shippingAddress: {
      name: String,
      addressOne: String,
      addressTwo: String,
      phone: String,
      email: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.toJSON = function () {
  const user = this

  const userObj = user.toObject()
  delete userObj.password
  delete userObj.tokens
  delete userObj.avatar

  return userObj
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'ThisIsMySecret324@!')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('No User Found')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Password not valid')

  return user
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 8)

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
