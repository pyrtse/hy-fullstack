import React, { useEffect } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import {initAnecdotes} from './reducers/anecdoteReducer'
 
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification/>
      <Anecdotes/>
      <AnecdoteForm/>
    </div>
  )
}

export default App