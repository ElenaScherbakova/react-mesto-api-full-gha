const router = require("express").Router();
const {
  celebrate,
  Segments,
  Joi,
} = require("celebrate");
const {
  createCard, getCards, deleteCard, createLikes, removeLikes,
} = require("../controllers/cards-controller");
const {
  validator,
  joiIdValidator,
} = require("../utils/utils");

router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom((value, helper) => (validator(value)
        ? value
        : helper.message({ custom: "Неправильный URL" }))),
    }),
  }),
  createCard,
)
router.get("/", getCards)
router.delete(
  "/:cardId",
  celebrate({
    [Segments.PARAMS]: {
      cardId: Joi.custom(joiIdValidator),
    },
  }),
  deleteCard,
)
router.put(
  "/:cardId/likes",
  celebrate({
    [Segments.PARAMS]: {
      cardId: Joi.custom(joiIdValidator),
    },
  }),
  createLikes,
)
router.delete(
  "/:cardId/likes",
  celebrate({
    [Segments.PARAMS]: {
      cardId: Joi.custom(joiIdValidator),
    },
  }),
  removeLikes,
)

module.exports = router
