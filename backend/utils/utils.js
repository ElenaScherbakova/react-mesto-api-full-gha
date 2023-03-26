const { Types } = require("mongoose");

const validator = (value) => {
  try {
    const url = new URL(value)
    return url.hostname !== ""
  } catch (e) {
    return false
  }
}

const joiIdValidator = (value, helper) => (Types.ObjectId.isValid(value)
  ? value
  : helper.message({ custom: "Неверный id" }))

module.exports = {
  validator,
  joiIdValidator,
}
