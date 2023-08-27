const User = require('../models/User')
const {
  addData,
  updateData,
  getData,
  getDataById,
} = require('./controllerTemplate')

exports.add = (req, res) => {
  addData(req, res, User)
}

exports.getAll = (req, res) => {
  getData(req, res, User)
}

exports.get = (req, res) => {
  getDataById(req, res, User)
}

exports.update = (req, res) => {
  updateData(req, res, User)
}
const bcrypt = require('bcryptjs') // For password hashing

exports.signup = (req, res) => {
  const { email, password } = req.body

  // Check if the email is already registered
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' })
      }

      // Hash the password before saving it
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }

        const newUser = new User({ email, password: hashedPassword })
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((error) => res.status(400).json({ error: error.message }))
      })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

exports.signin = (req, res) => {
  const { email, password } = req.body

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' })
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: 'Authentication failed' })
        }

        if (result) {
          const token = generateAuthToken(user)
          res.json({ message: 'Authentication successful', token })
        } else {
          res.status(401).json({ message: 'Authentication failed' })
        }
      })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

function generateAuthToken(user) {
  // You can use JWT or any other token-based approach here
  // Generate a token and return it
}
