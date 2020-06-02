import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'


const BlogList = () => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  if (user !== null) {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
  return(<div></div>)
}

export default BlogList