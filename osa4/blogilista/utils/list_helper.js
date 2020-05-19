/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const lodash = require('lodash')

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  // First, get the max vote from the array of objects
  var maxLikes = Math.max(...blogs.map(e => e.likes))
  // Get the object having votes as max votes
  var obj = blogs.find(blog => blog.likes === maxLikes)
  return obj
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  // const grouped = (lodash.groupBy(blogs, 'author'))

  const counted = (lodash.countBy(blogs, 'author'))
  const array = lodash.entries(counted)
  const mostBlogs = lodash.maxBy(array, lodash.last())
  return { 'author': mostBlogs[0], 'blogs': mostBlogs[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const grouped = lodash.groupBy(blogs, 'author')
  const mapped = lodash.map(grouped, (objs, key) => {
    return {
      'author': key,
      'likes': lodash.sumBy(objs, 'likes')
    }
  })
  const best = lodash.maxBy(mapped, 'likes')
  return best
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}