const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

// User signup and signin routes
router.post('/signup', userController.signup)
router.post('/signin', userController.signin)

// Generic routes using the controller functions
router.post('/', userController.add)
router.get('/', userController.getAll)
router.get('/:id', userController.get)
router.put('/:id', userController.update)

module.exports = router
