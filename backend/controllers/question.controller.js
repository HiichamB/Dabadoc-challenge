const Question = require('../models/question.model')
const {
  addData,
  updateData,
  getData,
  getDataById,
} = require('./controllerTemplate')

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
