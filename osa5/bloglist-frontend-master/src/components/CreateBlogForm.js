import React, { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      // eslint-disable-next-line no-dupe-keys
      url, url,
    })
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