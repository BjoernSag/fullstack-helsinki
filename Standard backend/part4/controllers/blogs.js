const postsRouter = require('express').Router()
const Blog = require('../models/post')

postsRouter.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  postsRouter.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

postsRouter.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = postsRouter