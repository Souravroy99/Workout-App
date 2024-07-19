const express = require('express')
const router = express.Router()
const userController = require('../Controllers/user-controller')


// Login Router
router.route('/login').post(userController.loginUser)

// SignUp Router
router.route('/signup').post(userController.signupUser)


module.exports = router 