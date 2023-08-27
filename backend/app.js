var createError = require('http-errors')

var path = require('path')
var cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
app.use(cors())
app.use(cookieParser())

// DB connection
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
