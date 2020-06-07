import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, GET_BOOKS } from '../queries'

const Books = (props) => {
  const  result = useQuery(ALL_BOOKS)
  const [getBooks, result2] = useLazyQuery(GET_BOOKS)
  const [genre, setGenre] = useState('All Genres')
  const [books, setBooks] = useState([])



  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (result2.data) {
      setBooks(result2.data.allBooks)
    }
  }, [result2])


  const changeGenre = (newGenre) => {
    if (newGenre === 'all genres') {
      getBooks({variables:{}})
    } else {
      getBooks({variables: {genre: newGenre}})
    }
    setGenre(newGenre)
  }

  if (!props.show) {
    return null
  }



  console.log(books)
  console.log(result2)

  return (
    <div>
      <h2>books</h2>
      <br/>
      <p>in genre <b>{genre}</b></p>
      <br/>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => changeGenre('refactoring')}>refactoring</button>
        <button onClick={() => changeGenre('agile')}>agile</button>
        <button onClick={() => changeGenre('patterns')}>patterns</button>
        <button onClick={() => changeGenre('design')}>design</button>
        <button onClick={() => changeGenre('crime')}>crime</button>
        <button onClick={() => changeGenre('classic')}>classic</button>
        <button onClick={() => changeGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books