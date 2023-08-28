const mongoose = require('mongoose')
const User = require('./user.model')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

questionSchema.post('save', async function (doc, next) {
  await User.updateOne(
    {
      _id: doc.user,
    },
    {
      $addToSet: {
        questions: doc._id,
      },
    },
  )
  next()
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
