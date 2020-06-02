/* eslint-disable linebreak-style */
import React, {  useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'
import Header from './components/Header'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUserlist} from './reducers/userlistReducer'

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.userlist)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUserlist())
  }, [])

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  console.log(match)
  console.log(user)

  return (
    <div>
      <Notification />
      <Header/>
      <Switch>
        <Route path='/users/:id'>
          <User user={user}/>
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/'>
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App