const Question = require('../models/question.model')
const {
  addData,
  updateData,
  getData,
  getDataById,
} = require('../helpers/crud.functions')
const { nextTick } = require('process')
const User = require('../models/user.model')

exports.add = (req, res) => {
  addData(req, res, Question)
}

exports.getAll = (req, res) => {
  getData(req, res, Question)
}

exports.get = (req, res) => {
  getDataById(req, res, Question)
}

exports.update = (req, res) => {
  updateData(req, res, Question)
}

exports.likeUnlike = async (req, res) => {
  const questionId = req.body.questionId
  const userId = req.body.userId
  const isLiked = req.body.isLiked
  const promises = []
  if (isLiked) {
    promises.push(
      Question.findByIdAndUpdate(
        questionId,
        { $push: { likes: userId } },
        { new: true },
      ),
      User.findByIdAndUpdate(
        userId,
        { $push: { favorites: questionId } },
        { new: true },
      ),
    )
  } else {
    promises.push(
      Question.findByIdAndUpdate(
        questionId,
        { $pull: { likes: userId } },
        { new: true },
      ),
      User.findByIdAndUpdate(
        userId,
        { $pull: { favorites: questionId } },
        { new: true },
      ),
    )
  }

  Promise.allSettled(promises)
    .then((result) => res.status(200).json({ isLiked }))
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Could not update question.', detail: error.message })
    })
}
