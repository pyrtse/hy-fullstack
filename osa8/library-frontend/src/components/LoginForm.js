import React, {useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import {LOGIN} from '../queries' 

const LoginForm = ({setToken, show, setPage, setError}) =>{
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('libraryUserToken', token)
    }
  }, [result.data]) //eslint-disable-line

  const handleLogin = (event) => {
    event.preventDefault()

    login({variables: {username: user, password}})
  }

  if(!show) {
    return null
  }

  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
          name<input onChange={({target}) => setUser(target.value)}/>
        </div>
        <div>
          password<input type='password' onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm