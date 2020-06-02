import userService from '../services/users'

const userlistReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERLIST':
    return action.data
  default:
    return state
  }
}

export const initializeUserlist = () => {
  return async dispatch => {
    const loadedUsers = await userService.getAll()
    loadedUsers.sort(function (a, b) {
      return b.blogs.length - a.blogs.length
    })
    dispatch({
      type: 'INIT_USERLIST',
      data: loadedUsers
    })
  }
}

export default userlistReducer