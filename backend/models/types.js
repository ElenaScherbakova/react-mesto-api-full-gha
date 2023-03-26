const mongoose = require("mongoose");
const { validator } = require("../utils/utils")

const field = {
  type: String,
  maxLength: 30,
  minLength: 2,
  default: "",
}

const link = {
  type: String,
  default: "",
  validate: {
    // Валидатор поддерживает URL с любым известным протоколом, в том числе и с data:
    validator,
    message: "Значение не является URL",
  },
}

const id = {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
}

module.exports = {
  field,
  link,
  id,
}
