
let lastTimeout

const notificationReducer = (state = { content: '', error:false }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return { content: '', error:false }
  default:
    return state
  }
}

export const setNotification = (content, error, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, error }
    })
    if(lastTimeout){
      clearTimeout(lastTimeout)
    }
    lastTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer