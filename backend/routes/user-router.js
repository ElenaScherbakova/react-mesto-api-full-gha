const router = require("express").Router();
const {
  celebrate,
  Segments,
  Joi,
} = require("celebrate");
const {
  getUser, getUsers, updateUserInformation, updateUserAvatar,
  getMe,
} = require("../controllers/user-controller");
const {
  validator,
  joiIdValidator,
} = require("../utils/utils");

router.get("/", getUsers)
router.get("/me", getMe)
router.get(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.custom(joiIdValidator),
    },
  }),
  getUser,
)
router.patch(
  "/me",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserInformation,
)
router.patch(
  "/me/avatar",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().custom((value, helper) => (validator(value)
        ? value
        : helper.message({ custom: "Неправильный URL" }))),
    }),
  }),
  updateUserAvatar,
)

module.exports = router
