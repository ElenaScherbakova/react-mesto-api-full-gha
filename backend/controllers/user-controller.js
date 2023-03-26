const createError = require("http-errors")
const User = require("../models/user")
const {
  http200,
  wrap,
} = require("./http-responses");

const findUser = async (userId, res) => {
  const user = await User.findById(userId)
  if (user) return http200(res, user)
  throw createError(404, "Пользователь не найден")
}

const getMe = async (req, res) => findUser(req.user._id, res)
const getUser = async (req, res) => findUser(req.params.userId, res)

const getUsers = () => User.find({})

const updateUserInternal = (
  id,
  res,
  update,
) => User.findByIdAndUpdate(
  id,
  update,
  { returnDocument: "after", runValidators: true, context: "query" },
)

const updateUserInformation = async ({
  body: { name, about },
  user: { _id },
}, res) => updateUserInternal(_id, res, { name, about })

const updateUserAvatar = async ({
  body: { avatar },
  user: { _id },
}, res) => updateUserInternal(_id, res, { avatar })

module.exports = wrap({
  getMe,
  getUser,
  getUsers,
  updateUserInformation,
  updateUserAvatar,
})
