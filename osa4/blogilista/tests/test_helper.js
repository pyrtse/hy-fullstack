const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: '1 blog',
        author: 'hiiri',
        url:'xxx',
        likes: 2
    },
    {
        title: '2 blog',
        author: 'koira',
        url: 'yyy',
        likes:0
    }
]

const nonExistingId = async () => {
    const blog = new blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}



module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}