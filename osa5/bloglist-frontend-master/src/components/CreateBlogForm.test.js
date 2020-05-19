import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import CreateBlogForm from './CreateBlogForm'

test('create blog form calls create with correct props', () => {
  const mockHandler = jest.fn()
  const component = render(
    <CreateBlogForm createBlog={mockHandler} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'title' }
  })
  fireEvent.change(author, {
    target: { value: 'author' }
  })
  fireEvent.change(url, {
    target: { value: 'url' }
  })

  fireEvent.submit(form)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('title')
  expect(mockHandler.mock.calls[0][0].url).toBe('url')
  expect(mockHandler.mock.calls[0][0].author).toBe('author')
})