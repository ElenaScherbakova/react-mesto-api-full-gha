const createError = require("http-errors")
const Card = require("../models/card")
const {
  http200, http201,
} = require("./http-responses");

const createCard = async (req, res, next) => {
  try {
    const {
      body: { name, link },
      user: { _id },
    } = req
    const result = await Card.create({ name, link, owner: _id })
    http201(res, result)
  } catch (e) {
    next(e)
  }
}

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate("likes")
    http200(res, cards)
  } catch (e) {
    next(e)
  }
}

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params
    const card = await Card.findById(cardId)
    if (card) {
      if (card.owner.equals(req.user._id)) {
        await Card.deleteOne(card)
        http200(res, { message: "Карточка успешно удалена." })
      } else next(createError(403, "Только автор может удалять свои карточки"))
    } else next(createError(404, `Картчока с id=${cardId} не найдена`))
  } catch (e) {
    next(e)
  }
}

const modifyLikes = async (req, res, next, add) => {
  try {
    const card = await Card.findByIdAndUpdate({
      _id: req.params.cardId,
    }, { [add ? "$addToSet" : "$pull"]: { likes: req.user._id } }, {
      returnDocument: "after",
    })
    if (card) http200(res, card)
    else next(createError(404, `Карта с id=${req.params.cardId}`))
  } catch (e) {
    next(e)
  }
}
const createLikes = (req, res, next) => modifyLikes(req, res, next, true)
const removeLikes = (req, res, next) => modifyLikes(req, res, next, false)

module.exports = {
  createCard,
  getCards,
  deleteCard,
  createLikes,
  removeLikes,
}
