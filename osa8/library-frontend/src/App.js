
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import {useApolloClient, useSubscription } from '@apollo/client'
import {BOOK_ADDED} from './queries'
import './App.css'


const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('libraryUserToken')
    if (loggedUserToken) {
      setToken(loggedUserToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      console.log(subscriptionData)
      window.alert(`new book '${subscriptionData.data.bookAdded.title}' added`)
    }
  })

  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={error} />
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <LoginForm show={page === 'login'} setPage={setPage} setToken={setToken} setError={notify}/>
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={error} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

    </div>
  )
}

export default App