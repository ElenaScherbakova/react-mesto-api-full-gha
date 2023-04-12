const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createError = require("http-errors");
const User = require("../models/user");
const { SECRET } = require("../middlewares/auth");

const {
  http200, http201,
} = require("./http-responses");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")
    if (user) {
      const value = await bcrypt.compare(password, user.password)
      if (value) {
        http200(res, {
          token: jwt.sign({ _id: user._id }, SECRET),
        })
        return
      }
    }
    next(createError(401, "Не правильный логин или пароль"))
  } catch (e) {
    next(e)
  }
}
const createUser = async (req, res, next) => {
  try {
    const {
      body: {
        name, avatar, about, email, password,
      },
    } = req
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name, avatar, about, email, password: hash,
    })
    const u = user.toJSON()
    delete u.password
    http201(res, u)
  } catch (e) {
    next(e.code === 11000
      ? createError(409, "Пользователь с таким email уже зарегистрирован")
      : createError(e))
  }
}

module.exports = {
  login,
  createUser,
}
