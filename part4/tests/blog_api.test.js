const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const Helper = require('./test_helper')



beforeEach(async () => {
    jest.setTimeout(30000)
	await Blog.deleteMany({})

	let blogObject = new Blog(Helper.initialBlogs[0])
	await blogObject.save()

	blogObject = new Blog(Helper.initialBlogs[1])
	await blogObject.save()

})

test('All blogs are returned', async () => {
	jest.setTimeout(30000)
    const response = await api.get('/api/blogs')

	expect(response.body.length).toBe(Helper.initialBlogs.length)
})

test('the first blog', async () => {
    jest.setTimeout(30000)
	const response = await api.get('/api/blogs')
	const titles = response.body.map(r => r.title)

	expect(titles).toContain('HTML is easy')
})

test('testing adding valid notes', async () => {
	jest.setTimeout(30000)
	const newBlog = {
		title: 'Laura is the best',
		author: 'Laura',
		url: 'www.google.com',
		likes: '10'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-type', /application\/json/)

	const response = await api.get('/api/blogs')

	const titles = response.body.map(r => r.title)

	expect(response.body.length).toBe(Helper.initialBlogs.length + 1)
	expect(titles).toContain(
		'Laura is the best'
	)

})

test('Blogpost without title will not be added', async () => {
	const newBlog = {
		author: 'Empty'
	}

	await api
		.post('api/blogs')
		.send(newBlog)
		.expect(400)

	const response = await api.get('/api/blogs')

	expect(response.body.length).toBe(Helper.initialBlogs.length)
})
describe('Deleting of a blog', () => {
    test.only('returns with status code 204 if id is valid', async () => {
        jest.setTimeout(30000)
        const blogsAtStart = await Helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]


        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await Helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(Helper.initialBlogs.length-1)

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})


afterAll(() => {
    mongoose.connection.close()
})