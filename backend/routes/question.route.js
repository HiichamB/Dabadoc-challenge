const express = require('express')
const router = express.Router()
const questionController = require('../controllers/question.controller')

// Generic routes using the controller functions
router.post('/', questionController.add)
router.get('/', questionController.getAll)
router.get('/:id', questionController.get)
router.put('/:id', questionController.update)

module.exports = router
