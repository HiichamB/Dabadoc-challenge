const { sign, verify } = require('jsonwebtoken')

/**
 * this function is for creating a jwt token
 */
module.exports.jwtSign = (data) => {
  if (!process.env.TOKEN_KEY)
    throw Error(
      'there is no TOKEN_KEY value in .env file. or there is no .env file',
    )
  if (!process.env.TOKEN_EXPIRATION_DURATION_IN_MILLISECOND)
    throw Error(
      'there is no TOKEN_EXPIRATION_DURATION_IN_MILLISECOND value in .env file',
    )

  return sign(data, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_EXPIRATION_DURATION_IN_MILLISECOND,
  })
}

/**
 * this function is for validate the token
 */
module.exports.jwtVerify = (token) => {
  if (!process.env.TOKEN_KEY)
    throw Error(
      'there is no TOKEN_KEY value in .env file. or there is no .env file',
    )

  return verify(token, process.env.TOKEN_KEY)
}
