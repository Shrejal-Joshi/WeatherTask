const OpenWeatherMapHelper = require('openweathermap-node')
const moment = require('moment')
require('dotenv').config()
const helper = new OpenWeatherMapHelper(
  {
    APPID: '91645359d4a85ac07b3a0c92b6704d10',
    units: 'imperial',
    lang: 'en'
  }
)
const weather = async (req, res) => {
  try {
    helper.getThreeHourForecastByCityName(req.query.cityname, (err, threeHoursForecast) => {
      if (err) {
        console.log(err)
        res.status(400).message(`Something went wrong : ${err}`)
      } else {
        const weather = []
        for (const obj of threeHoursForecast.list) {
          weather.push({
            id: obj.weather[0].id,
            temp: obj.main.temp,
            date: moment(obj.dt_txt).format('MMM Do, YYYY'),
            main: obj.weather[0].main
          })
        }
        res.status(200).json({ message: 'Weather details fetched successfully', location: req.query.cityname, count: threeHoursForecast.cnt, weather })
      }
    })
  } catch (error) {
    if (error.response) {
      console.log(error)
      res.status(400).message(`Something went wrong : ${error}`)
    }
  }
}

module.exports = { weather }
