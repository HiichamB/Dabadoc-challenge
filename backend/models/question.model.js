const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
