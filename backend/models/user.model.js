const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastConnectionDate: { type: Date, default: new Date() },
  active: { type: Boolean, default: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
})

const User = mongoose.model('User', userSchema)

module.exports = User
