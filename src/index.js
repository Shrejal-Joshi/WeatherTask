const express = require('express')
const app = express()
const userRouter = require('./routes/users')
const newsRouter = require('./routes/news')
const weatherRouter = require('./routes/weather')
const mongoose = require('mongoose')
const port = 5000

// const DB_URL = process.env.MONGO_URI
app.use(express.json())
app.use('/users', userRouter)
app.use('/news', newsRouter)
app.use('/weather', weatherRouter)

/// mXKNMhdfmSqyri3x
mongoose.connect('mongodb+srv://useradmin:mXKNMhdfmSqyri3x@cluster0.ri5kic0.mongodb.net/?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => {
    app.listen(port, () => {
      console.log('Server started on the port : 5000')
    })
  })
  .catch((error) => {
    console.log(error)
  })
