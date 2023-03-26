const jwt = require("jsonwebtoken");
const createError = require("http-errors")

const { NODE_ENV, JWT_SECRET: SECRET = NODE_ENV !== 'production' ? 'dev-secret': null } = process.env

if (NODE_ENV === 'production') {
  throw new Error('JWT_SECRET отсутсвует.')
} else {

}

const checkToken = (req, res, next) => {
  let success = false
  const { authorization = "" } = req.headers;
  const token = authorization.startsWith("Bearer ")
    ? authorization.replace("Bearer ", "")
    : null

  if (token) {
    try {
      req.user = jwt.verify(token, SECRET)
      success = true
    } catch (err) {
      // Ignore
    }
  }

  if (success) next()
  else next(createError(401, "Необходима авторизация"))
}

module.exports = { checkToken, SECRET }
