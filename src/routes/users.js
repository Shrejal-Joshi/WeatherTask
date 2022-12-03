const express = require('express')
const auth = require('../auth')
const { singup, singin, logout } = require('../controllers/userControllers')
const userRouter = express.Router()

userRouter.post('/singup', singup
)

userRouter.post('/singin', singin)
userRouter.post('/logout', auth, logout)

module.exports = userRouter
