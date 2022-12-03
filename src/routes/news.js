const express = require('express')
const auth = require('../auth')
const { news, searchNews } = require('../controllers/newsControllers')
const newsRouter = express.Router()

newsRouter.get('/', auth, news)
newsRouter.get('/news', auth, searchNews)

module.exports = newsRouter
