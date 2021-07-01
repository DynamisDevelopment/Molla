const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate(val) {
        if (!validator.isEmail(val)) throw new Error('Email is invalid')
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(val) {
        if (val < 18) throw new Error('Must be an adult')
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(val) {
        if (val.toLowerCase().includes('password'))
          throw new Error("Password cannot contain the password 'password'")
      },
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

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
})

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

userSchema.pre('remove', async function (next) {
  const user = this

  await Task.deleteMany({ owner: user._id })

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
