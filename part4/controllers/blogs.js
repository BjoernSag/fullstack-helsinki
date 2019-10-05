const postsRouter = require('express').Router()
const Blog = require('../models/blog')

postsRouter.get('/', async (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

postsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(post => post.toJSON()))
})

postsRouter.get('/api/blogs/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    console.log(blog)
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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  }catch(exception){
    next(exception)
  }
  blog
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