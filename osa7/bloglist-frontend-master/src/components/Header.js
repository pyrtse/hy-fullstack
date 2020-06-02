import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './login'
import { logout } from '../reducers/userReducer'

const Header = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  if (user === null) {
    return (
      <div>
        <h1>blogs</h1>
        <LoginForm />
      </div>

    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <br />
      <div>Logged in as {user.username} <button onClick={handleLogout}>logout</button></div>
    </div>
  )
}

export default Header