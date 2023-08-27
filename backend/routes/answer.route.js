const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answer.controller')

// Generic routes using the controller functions
router.post('/', answerController.add)
router.get('/', answerController.getAll)
router.get('/:id', answerController.get)
router.put('/:id', answerController.update)

module.exports = router
