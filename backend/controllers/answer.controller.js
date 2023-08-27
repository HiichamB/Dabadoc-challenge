const Answer = require('../models/answer.model')
const {
  addData,
  updateData,
  getData,
  getDataById,
} = require('./controllerTemplate')

exports.add = (req, res) => {
  addData(req, res, Answer)
}

exports.getAll = (req, res) => {
  getData(req, res, Answer)
}

exports.get = (req, res) => {
  getDataById(req, res, Answer)
}

exports.update = (req, res) => {
  updateData(req, res, Answer)
}
