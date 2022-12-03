const userModel = require('../models/users')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'USER_API'
const bcrypt = require('bcrypt')

const singup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'user already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await userModel.create({
      email,
      password: hashedPassword,
      username
    })
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY)
    res.status(200).json({ user: result, token })
  } catch (err) {
    console.log(err)
    res.status(200).json({ message: 'Something went wrong !!' })
  }
}

const singin = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await userModel.findOne({ email })
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password)
    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY)
    res.status(201).json({ user: existingUser, token })
  } catch (err) {
    console.log(err)
    res.status(200).json({ message: 'Something went wrong !!' })
  }
}

const logout = async (req, res) => {
  try {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      // eslint-disable-next-line no-unused-vars
      jwt.sign(token, SECRET_KEY, { expiresIn: 1 }, (logout, err) => {
        if (logout) {
          res.status(200).json({ message: ' Logged out successfully !! ' })
        } else { res.status(401).json({ message: 'Unauthorized user' }) }
      })
    }
  } catch (err) {
    console.log(err)
    res.status(200).json({ message: 'Something went wrong !!' })
  }
}

module.exports = { singin, singup, logout }
