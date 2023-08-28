const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')
const User = require('../models/user.model')

exports.login = (req, res) => {
  User.findOne({ email: req.body.email, active: true })
    .lean()
    .exec()
    .then(async (doc) => {
      if (doc) {
        if (bcrypt.compareSync(req.body.password, doc.password)) {
          let token = jwt.jwtSign({ userId: doc._id })
          let user = await User.findOneAndUpdate(
            { _id: doc._id },
            {
              lastConnectionDate: new Date(),
              $inc: { nbrConnection: 1 },
            },
            { new: true },
          )
            .lean()

            .select('-password -__v')

          let expiresIn =
            Date.now() + +process.env.TOKEN_EXPIRATION_DURATION_IN_MILLISECOND

          return res.status(200).send({ user, expiresIn, token })
        }

        return res
          .status(401)
          .send({ message: 'email or password is incorrect' })
      }

      User.findOne({ email: req.body.email })
        .lean()
        .exec()
        .then((doc) => {
          if (doc)
            return res.status(406).send({
              message: 'account is disabled please contact your administrator',
            })

          res.status(401).send({ message: 'email or password is incorrect' })
        })
        .catch((error) => {
          console.log('error', error)
          res.status(401).send({ message: 'email or password is incorrect' })
        })
    })
    .catch((error) => {
      console.log('error', error)
      res.status(400).send({ message: 'error', detail: error })
    })
}

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
          .then((user) => res.json({ message: 'account created' }))
          .catch((error) => res.status(400).json({ error: error.message }))
      })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

exports.regenerateToken = (req, res) => {
  let { userId } = jwt.jwtVerify(req.headers[process.env.TOKEN_FIELD_NAME])
  let token = jwt.jwtSign({ userId })
  let expiresIn =
    Date.now() + +process.env.TOKEN_EXPIRATION_DURATION_IN_MILLISECOND
  res.status(200).send({ expiresIn, token })
}
