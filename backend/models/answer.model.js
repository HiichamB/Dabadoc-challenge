const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  content: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
