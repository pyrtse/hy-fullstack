import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('Renders title but no url or likes at default', () => {
  const blog = {
    title: 'otsikko',
    author: 'kirjoittaja',
    url: 'url',
    likes: 'likes',
    user: { username: 'eri', id:'userid' },
    id: 'blogid'
  }

  const user = {
    username: 'testi'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} deleteBlog={mockHandler} />
  )


  expect(component.container).toHaveTextContent('otsikko')
  expect(component.container).toHaveTextContent('kirjoittaja')
  let element
  try {
    element = component.getByText('url')
  } catch(excpection){
    console.log()
  }
  expect(element).toBeUndefined()

  let element2
  try {
    element2 = component.getByText('likes')
  } catch(excpection){
    console.log()
  }
  expect(element2).toBeUndefined()
})

test('Renders also url and likes when clicked', () => {
  const blog = {
    title: 'otsikko',
    author: 'kirjoittaja',
    url: 'url',
    likes: 'likes',
    user: { username: 'eri', userid:'userid' },
    id: 'blogid'
  }

  const user = {
    username: 'testi'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} deleteBlog={mockHandler} />
  )


  expect(component.container).toHaveTextContent('otsikko')
  expect(component.container).toHaveTextContent('kirjoittaja')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('likes')
  expect(component.container).toHaveTextContent('url')
})

test('Clicking like twice calls updataBlog twice', () => {
  const blog = {
    title: 'otsikko',
    author: 'kirjoittaja',
    url: 'url',
    likes: 'likes',
    user: { username: 'eri', userid:'userid' },
    id: 'blogid'
  }

  const user = {
    username: 'testi'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} deleteBlog={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls.length).toBe(2)
})