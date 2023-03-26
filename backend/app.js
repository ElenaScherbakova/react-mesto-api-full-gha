const { connect } = require("mongoose")
const cors = require("cors")
const express = require("express")
const {
  celebrate, Joi, Segments, errors,
} = require("celebrate");
const createError = require("http-errors")
const userRouter = require("./routes/user-router")
const cardsRouter = require("./routes/cards-router")
const { http500 } = require("./controllers/http-responses");
const {
  login,
  createUser,
} = require("./controllers/login-controller");
const { checkToken } = require("./middlewares/auth");
const { validator } = require("./utils/utils");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env

connect("mongodb://127.0.0.1:27017/mestodb", {})
  .then(() => {
    const app = express();
    app.use(cors())
    app.use(express.json())
    app.use(requestLogger)
    app.post(
      "/signin",
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          email: Joi.string().required().email(),
          password: Joi.string().required(),
        }),
      }),
      login,
    )
    app.post(
      "/signup",
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().min(2).max(30),
          email: Joi.string().required().email(),
          password: Joi.string()
            .required(),
          about: Joi.string().min(2).max(30),
          avatar: Joi.string().custom((value, helper) => (validator(value)
            ? value
            : helper.message({ custom: "Неправильный URL" }))),
        }),
      }),
      createUser,
    )
    app.use(checkToken)
    app.use("/users", userRouter)
    app.use("/cards", cardsRouter)

    app.use((req, res, next) => {
      next(createError(404, "Ресурс не найден"))
    })
    /*
        https://github.com/arb/celebrate
        errors([opts])

        Returns a function with the error handler signature ((err, req, res, next)).
        This should be placed with any other error handling middleware to catch celebrate errors.
        If the incoming err object is an error originating from celebrate,
        errors() will respond a pre-build error object.
        Otherwise, it will call next(err) and will pass the error along and will need
        to be processed by another error handler.

        Исходя из вышесказанного, этот middleware должен быть сработать перед
        главным обработчиком Ошибок.

        Противном случае объект ошибки не будет сожержать поле statusCode.
     */
    app.use(errorLogger)
    app.use(errors())
    app.use((err, req, res, next) => {
      // https://expressjs.com/en/guide/error-handling.html
      // So when you add a custom error handler, you must delegate to the default
      // Express error handler, when the headers have already been sent to the client:
      if (!res.headersSent) {
        if (err.statusCode > 0) {
          res
            .status(err.statusCode)
            .send({ message: err.message })
        } else {
          http500(res, "Непредвиденная ошибка сервера")
        }
        // Eslint-error: Expected to return a value at the end of arrow function  consistent-return
        return null
      }
      return next(err)
    })
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}.`)
    })
  })
  .catch((e) => {
    console.error("Соединение с mongodb не установленно.")
    console.error(e.message)
  })
