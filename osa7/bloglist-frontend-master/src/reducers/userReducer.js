import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USER':
    console.log('init user')
    console.log(action.data)
    return action.data
  case 'LOGIN':
    console.log('login')
    console.log(action.data)
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  blogService.setToken(null)
  return {
    type: 'LOGOUT'
  }
}

export default userReducer