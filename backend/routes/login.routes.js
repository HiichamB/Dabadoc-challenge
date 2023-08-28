const express = require('express')
const router = express.Router()
const controller = require('../controllers/login.controller')

router.get('/token', controller.regenerateToken)
router.post('/login', controller.login)
router.post('/register', controller.signup)

module.exports = router
