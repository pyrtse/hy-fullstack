
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  const updateAuthor = async (event) => {
    event.preventDefault()
    console.log(name)
    editAuthor({variables: {name: name, setBornTo: Number(born)}})
    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }
  let authors = []
  if (result.data) {
    authors = result.data.allAuthors
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          name<select value={name} onChange={({ target }) => setName(target.value)} >
            <option value='' selected disabled hidden></option>
            {authors.map(a => 
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born<input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
