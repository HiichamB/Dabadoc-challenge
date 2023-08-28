const createError = require('http-errors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

const verifyToken = require('./middlewares/token.validation.middleware.js')

dotenv.config()

app.use(cors())
app.use(cookieParser())

mongoose
  .connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
  .then(() => {
    console.log(
      `Connected to \`${process.env.DB_NAME}\` database in \`${process.env.PORT}\ `,
    )
  })
  .catch((err) => {
    ;(err) => {
      console.error('there is an error while connecting to mongoDB', err)
    }
  })
app.use(express.json({ limit: '50mb' }))
app.use('/uploads', express.static('uploads'))

app.use(morgan('dev'))

const answerRoute = require('./routes/answer.route')
const userRoute = require('./routes/user.route')
const questionRoute = require('./routes/question.route')

const loginRoute = require('./routes/login.routes.js')

console.log('typeof verifyToken', typeof verifyToken)

app.use('/api/connect', loginRoute)

app.use(verifyToken)

app.use('/api/users', userRoute)
app.use('/api/answers', answerRoute)
app.use('/api/questions', questionRoute)

// DB connection

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500
  res.status(errorStatus)
  res.json({
    error: {
      message: error.message,
      status: errorStatus,
    },
  })
})
app.use('/', (req, res) => {
  res.status(200).send('Your are connected to API (-_-)')
})
module.exports = app
