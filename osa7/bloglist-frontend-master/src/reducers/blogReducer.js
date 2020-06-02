import blogService from '../services/blogs'
import initializeUserlist from './userlistReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'UPDATE_BLOG':
    return state.map((object => object.id === action.data.id ? action.data : object)).sort(function (a, b) {
      return b.likes - a.likes
    })
  case 'REMOVE_BLOG':
    return state.filter(object => object.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const loadedBlogs = await blogService.getAll()
    loadedBlogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    dispatch({
      type: 'INIT_BLOGS',
      data: loadedBlogs
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const addedBlog = await blogService.create(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: addedBlog
    })
    dispatch(initializeUserlist())
  }
}

export const updateBlog = (blogToUpdate) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blogToUpdate)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export default blogReducer