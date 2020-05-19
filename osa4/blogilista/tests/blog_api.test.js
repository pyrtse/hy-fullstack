const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('id field id not _id ', async () => {
    const blogsInDB = await helper.blogsInDb()
    expect(blogsInDB[0].id).toBeDefined()
})

test('post works', async () => {

    const newBlog = new  Blog({
        title: 'uusi',
        author: 'testi',
        url: 'xxx',
        likes: 100
    })

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    const blogsInEnd = await helper.blogsInDb()
    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('empty likes set zero', async () => {
    const newBlog = new Blog({
        title: 'tyhjalike',
        author: 'testu',
        url: 'xxx'
    })

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    const blogsInEnd = await helper.blogsInDb()
    const newestBlog =  blogsInEnd.find(blog => blog.title === 'tyhjalike')
    expect(newestBlog.likes).toBe(0)
})

test('400 with nondefined title', async () => {
    const newBlog = new Blog({
        author: 'tyhjatitle',
        url: 'xxx',
        likes: 5
    })

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('400 with nondefined url', async () => {
    const newBlog = new Blog({
        title: 'tyhjaurl',
        author: 'testi',
        likes: 5
    })

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('Delete blog', async() => {
    const blogs = await helper.blogsInDb()
    const idToDelete = blogs[0].id
    const uri = `/api/blogs/${idToDelete}`

    await api
        .delete(uri)
        .expect(204)

    const blogsInEnd = await helper.blogsInDb()
    expect(blogsInEnd.length).toBe(helper.initialBlogs.length - 1)
})

test('Update blog', async() => {
    const blogs = await helper.blogsInDb()
    let blogToUpdate = blogs[0]
    blogToUpdate.likes = blogToUpdate.likes + 1
    const uri = `/api/blogs/${blogToUpdate.id}`

    await api
        .put(uri)
        .send(blogToUpdate)
        .expect(200)

    const blogsInEnd = await helper.blogsInDb()
    const updatedBlog = blogsInEnd.find(blog => blog.id === blogToUpdate.id )
    expect(updatedBlog).toBeDefined()
    expect(updatedBlog.likes).toBe(blogToUpdate.likes)
    expect(updatedBlog.author).toBe(blogToUpdate.author)
    expect(updatedBlog.title).toBe(blogToUpdate.title)
    expect(updatedBlog.url).toBe(blogToUpdate.url)
})

afterAll(() => {
    mongoose.connection.close()
})