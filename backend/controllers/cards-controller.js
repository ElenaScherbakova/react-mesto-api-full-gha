const createError = require("http-errors")
const Card = require("../models/card")
const {
  http200,
  wrap,
} = require("./http-responses");

const createCard = ({
  body: { name, link },
  user: { _id },
}) => Card.create({ name, link, owner: _id })
const getCards = () => Card.find({}).populate("likes")

const deleteCard = async (req) => {
  const { cardId } = req.params
  const card = await Card.findById(cardId)
  if (card) {
    if (card.owner.equals(req.user._id)) {
      await Card.deleteOne(card)
      return { message: "Карточка успешно удалена." }
    }
    throw createError(403, "Только автор может удалять свои карточки")
  } else throw createError(404, `Картчока с id=${cardId} не найдена`)
}

const modifyLikes = async (req, res, add) => {
  const card = await Card.findByIdAndUpdate({
    _id: req.params.cardId,
  }, { [add ? "$addToSet" : "$pull"]: { likes: req.user._id } }, {
    returnDocument: "after",
  })
  if (card) http200(res, card)
  else throw createError(404, `Карта с id=${req.params.cardId}`)
}
const createLikes = (req, res) => modifyLikes(req, res, true)
const removeLikes = (req, res) => modifyLikes(req, res, false)

module.exports = wrap({
  createCard,
  getCards,
  deleteCard,
  createLikes,
  removeLikes,
})
