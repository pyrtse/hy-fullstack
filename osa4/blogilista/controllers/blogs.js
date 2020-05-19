const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/',async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name:1 })
  response.json(blogs.map( b =>  b.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  if (!body.url) {
    return response.status(400).json({
      error:'url missing'
    })
  }

  if (body.likes === undefined) {
    body.likes = 0
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    user: user._id
  })
  const result  = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const id = request.params.id

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const oldBlog = await Blog.findById(id)

  if (decodedToken.id.toString() !== oldBlog.user.toString() ) {
    return response.status(401).json({ error: 'not authorized' })
  }

  if (!blog.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  if (!blog.url) {
    return response.status(400).json({
      error:'url missing'
    })
  }

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true } )
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter