const express = require('express')
const router = express.Router()
const questionController = require('../controllers/question.controller')

// Generic routes using the controller functions
router.route('/').get(questionController.getAll).post(questionController.add)

router.post('/likeUnlike', questionController.likeUnlike)

router.route('/:id').get(questionController.get).put(questionController.update)

module.exports = router
