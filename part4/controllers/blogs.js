const postsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

postsRouter.get('/', async (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

postsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(post => post.toJSON()))
})

postsRouter.get('/api/blogs/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
      response.json(blog.toJSON())
    }else {
      response.status(404).end()
    }
  }catch(exception) {
    next(exception)
  }
})

postsRouter.post('/api/blogs', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' })
    }

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  }catch(exception){
    next(exception)
  }
})

postsRouter.delete('/api/blogs/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }catch(exception) {
    next(exception)
  }

})

postsRouter.put('/api/blogs/:id', async (request, response, next) => {
  const body = request.body

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes : body.likes
  }

  try {
    const blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, post, {new : true})
    response.json(blogToUpdate.toJSON())
  }catch(exception) {
    next(exception)
  }

})



module.exports = postsRouter