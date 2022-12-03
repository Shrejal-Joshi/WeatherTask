const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('f5947cbac7b54ca5b7eaec409f5c066c')
const news = async (req, res) => {
  try {
    // console.log(req.query.category, ' == req')
    // const category = req.query.category
    const result = await newsapi.v2.topHeadlines({
      language: 'en'
    })
    const news = []
    for (const obj of result.articles) {
      news.push({
        title: obj.title,
        description: obj.description,
        link: obj.url,
        image: obj.urlToImage
      })
    }
    if (result) {
      res.status(200).json({ count: result.totalResults, data: news })
    } else {
      res.status(400).message('Something went wrong !!')
    }
  } catch (error) {
    if (error.response) {
      console.log(error)
      res.status(400).message(`Something went wrong : ${error}`)
    }
  }
}

const searchNews = async (req, res) => {
  try {
    const result = await newsapi.v2.everything({
      q: req.query.search, // Set the query to the user search key
      sources: req.query.source,
      language: 'en'
    })
    const news = []
    for (const obj of result.articles) {
      news.push({
        title: obj.title,
        description: obj.description,
        link: obj.url,
        image: obj.urlToImage
      })
    }
    if (result) {
      res.status(200).json({ message: 'News details fetched successfully', count: result.totalResults, data: news })
    } else {
      res.status(400).message('Something went wrong !!')
    }
  } catch (error) {
    if (error.response) {
      console.log(error)
      res.status(400).message(`Something went wrong : ${error}`)
    }
  }
}

module.exports = { news, searchNews }
