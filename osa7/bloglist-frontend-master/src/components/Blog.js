import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification} from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
  const [show, setShow] = useState(false)
  console.log(user)
  console.log(blog)
  const dispatch = useDispatch()

  const ownBlog = true
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
    try {
      dispatch(updateBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        userId: blog.user.id,
        id: blog.id
      }))
      dispatch(setNotification('Blog liked', false, 2))
    } catch (error) {
      dispatch(setNotification('Something went wrong', true, 2))
    }
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification('Blog deleted', false ,2))
      } catch (error) {
        console.log(error)
        dispatch(setNotification('Run to an error while deleting blog', true, 2))
      }
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
}


export default Blog
