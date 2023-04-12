const createError = require("http-errors")
const User = require("../models/user")
const {
  http200,
} = require("./http-responses");

const findUser = async (userId, res, next) => {
  try {
    const user = await User.findById(userId)
    if (user) {
      http200(res, user)
    } else {
      next(createError(404, "Пользователь не найден"))
    }
  } catch (e) {
    next(e)
  }
}

const getMe = async (req, res, next) => findUser(req.user._id, res, next)
const getUser = async (req, res, next) => findUser(req.params.userId, res, next)

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    http200(res, users)
  } catch (e) {
    next(e)
  }
}

const updateUserInternal = (
  id,
  res,
  update,
) => User.findByIdAndUpdate(
  id,
  update,
  { returnDocument: "after", runValidators: true, context: "query" },
)

const updateUserInformation = async (req, res, next) => {
  try {
    const {
      body: { name, about },
      user: { _id },
    } = req
    const result = await updateUserInternal(_id, res, { name, about })
    http200(res, result.toJSON())
  } catch (e) {
    next(e)
  }
}
const updateUserAvatar = async (req, res, next) => {
  try {
    const {
      body: { avatar },
      user: { _id },
    } = req
    const result = await updateUserInternal(_id, res, { avatar })
    http200(res, result)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getMe,
  getUser,
  getUsers,
  updateUserInformation,
  updateUserAvatar,
}
