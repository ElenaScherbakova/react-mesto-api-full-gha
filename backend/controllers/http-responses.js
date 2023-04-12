const http500 = (res, message) => {
  res.status(500).send({ message })
}

const http400 = (res, message) => {
  res.status(400).send({ message })
}

const http401 = (res, message) => {
  res.status(401).send({ message })
}

const http403 = (res, message) => {
  res.status(403).send({ message })
}

const http404 = (res, message) => {
  res.status(404).send({ message })
}
const http409 = (res, message) => {
  res.status(409).send({ message })
}

const http200 = (res, data) => {
  res.status(200).send(data)
}

const http201 = (res, data) => {
  res.status(201).send(data)
}

module.exports = {
  http200,
  http201,
  http400,
  http401,
  http403,
  http404,
  http409,
  http500,
}
