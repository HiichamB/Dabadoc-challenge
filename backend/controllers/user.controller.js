const User = require('../models/user.model')
const {
  addData,
  updateData,
  getData,
  getDataById,
} = require('../helpers/crud.functions')

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

function generateAuthToken(user) {
  // You can use JWT or any other token-based approach here
  // Generate a token and return it
}
