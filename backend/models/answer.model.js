const mongoose = require('mongoose')

const Schema = mongoose.Schema

const answerSchema = new Schema({
  content: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

answerSchema.post('save', async function (doc, next) {
  await User.updateOne(
    {
      _id: doc.user,
    },
    {
      $addToSet: {
        answers: doc._id,
      },
    },
  )

  let ab = await Question.updateOne(
    {
      _id: doc.question,
    },
    {
      $addToSet: {
        answers: doc._id,
      },
    },
  )

  next()
})

const Answer = mongoose.model('Answer', answerSchema)
const User = require('./user.model')
const Question = require('./question.model')
module.exports = Answer
