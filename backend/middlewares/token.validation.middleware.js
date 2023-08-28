const jwt = require('../helpers/jwt.js')

module.exports = (req, res, next) => {
  if (jwt.jwtVerify(req.headers[process.env.TOKEN_FIELD_NAME])) next()
  else res.status(401).send({ error: 'Invalid token' })
}
