const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

userRouter.post('/', async (request, response, next) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  if(!body.password)  {
    return response.status(400).json({
      error: 'password missing'
    })
  }

  if(body.password < 3) {
    return response.status(422).json({
      error: 'invalid password'
    })
  }

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }

})

module.exports = userRouter