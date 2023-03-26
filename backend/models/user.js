const validator = require("validator");
const { Schema, model } = require("mongoose")
const { field, link } = require("./types")

const userSchema = new Schema({
  name: {
    ...field,
    default: "Жак-Ив Кусто",
  },
  about: {
    ...field,
    default: "Исследователь",
  },
  avatar: {
    ...link,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Неправильный формат email.",
    },
  },
  password: {
    type: String,
    select: false,
  },
})

module.exports = model("user", userSchema)
