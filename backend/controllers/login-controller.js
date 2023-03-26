const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createError = require("http-errors");
const User = require("../models/user");
const { SECRET } = require("../middlewares/auth");

const {
  wrap,
} = require("./http-responses");

const login = async (req) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select("+password")
  if (user && bcrypt.compare(password, user.password)) {
    return { token: jwt.sign({ _id: user._id }, SECRET) }
  }
  throw createError(401, "Не правильный логин или пароль")
}
const createUser = async ({
  body: {
    name, avatar, about, email, password,
  },
}) => {
  const hash = await bcrypt.hash(password, 10)
  try {
    const user = await User.create({
      name, avatar, about, email, password: hash,
    })
    const u = user.toJSON()
    delete u.password
    return u
  } catch (e) {
    throw e.code === 11000
      ? createError(409, "Пользователь с таким email уже зарегистрирован")
      : e
  }
}

module.exports = wrap({
  login,
  createUser,
})
