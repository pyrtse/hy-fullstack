import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [show, setShow] = useState(false)
  console.log(user)
  console.log(blog)

  const ownBlog = (user.username === blog.user.username)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = () => {
    setShow(!show)
  }

  const like = () => {
    updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      userId: blog.user.id,
      id: blog.id
    })
  }

  const removeBlog = () => {
    if(window.confirm(`Remove blog ${blog.title}`)){
      deleteBlog(blog.id)
    }
  }

  const removeButton = () => (
    <button onClick={removeBlog}>Remove</button>
  )

  if (show) {
    return (
      <div style={blogStyle} className='blog'>
        <div>
          <p>{blog.title} {blog.author} <button onClick={toggleShow}>view</button></p>
          <p>{blog.url}</p>
          <p className='blog-likes' test-data={blog.likes}> likes {blog.likes} <button onClick={like} className="like-button">like</button></p>
          <p>{blog.user.username}</p>
          {ownBlog && removeButton()}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button onClick={toggleShow} className='open-blog-button'>view</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


export default Blog
