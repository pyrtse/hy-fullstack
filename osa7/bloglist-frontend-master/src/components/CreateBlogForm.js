import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const CreateBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const addBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog({
        title: title,
        author: author,
        // eslint-disable-next-line no-dupe-keys
        url, url,
      }))
      dispatch(setNotification('Blog created', false, 2))
    } catch (error) {
      dispatch(setNotification('Error creating blog', true, 2))
    }

  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:<input
          id="title"
          type="text"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />
      author:<input
          id="author"
          type="text"
          onChange={({ target }) => setAuthor(target.value)}
          value={author}
        />
      url:<input
          id="url"
          type="text"
          onChange={({ target }) => setUrl(target.value)}
          value={url}
        />
        <button type="submit" id="create-blog-button">create</button>
      </form>
    </div>
  )

}



export default CreateBlogForm