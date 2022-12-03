const express = require('express')
const { weather } = require('../controllers/weatherControllers')
const weatherRouter = express.Router()

weatherRouter.get('/', weather)

module.exports = weatherRouter
