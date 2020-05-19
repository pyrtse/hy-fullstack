/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'
import Togglabe from './components/Togglable'
import './App.css'

const Notification = ({ errorMessage, notificationMessage }) => {
  if (errorMessage) {
    return (
      <div className="error">{errorMessage}</div>
    )
  }
  if (notificationMessage) {
    return (
      <div className="notification">{notificationMessage}</div>
    )
  }
  return (<div></div>)
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const createBlogFormRef = React.createRef()
  useEffect(() => {
    let mounted = true
    async function getBlogs() {
      const loadedBlogs = await blogService.getAll()
      loadedBlogs.sort(function (a, b) {
        return b.likes - a.likes
      })
      if (mounted) {
        setBlogs(loadedBlogs)
      }
    }
    getBlogs()
    return () => mounted = false
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addNewBlog = async (blogObject) => {
    try {
      createBlogFormRef.current.toggleVisibility()
      blogObject.userId = user.id
      const savedObject = await blogService.create(blogObject)
      setNotificationMessage(`a new blog ${savedObject.title} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      const allBlogs = await blogService.getAll()
      allBlogs.sort(function (a, b) {
        return b.likes - a.likes
      })

      setBlogs(allBlogs)
    } catch (error) {
      console.log(error)
      setErrorMessage('Error creating new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject)
      const allBlogs = await blogService.getAll()
      allBlogs.sort(function (a, b) {
        return b.likes - a.likes
      })

      setBlogs(allBlogs)
    } catch (error) {
      setErrorMessage('Error updating new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      const allBlogs = await blogService.getAll()
      allBlogs.sort(function (a, b) {
        return b.likes - a.likes
      })
      setBlogs(allBlogs)
    } catch (error) {
      setErrorMessage('Error updating new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )

  const createBlogForm = () => (
    <Togglabe buttonLabel="create blog" ref={createBlogFormRef} buttonId='createBlog-button'>
      <CreateBlogForm createBlog={addNewBlog} />
    </Togglabe>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <br />
      <div>Logged in as {user.username} <button onClick={handleLogout}>logout</button></div>
      <br />
      {createBlogForm()}
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        )}
      </div>
    </div>
  )
  return (
    <div>
      <Notification errorMessage={errorMessage} notificationMessage={notificationMessage} />
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App