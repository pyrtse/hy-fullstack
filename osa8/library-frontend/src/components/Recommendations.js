import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import {ME, GET_BOOKS} from '../queries'


const Recommendations = ( {show}) => {
  const result = useQuery(ME)
  const [getBooks, result2] = useLazyQuery(GET_BOOKS)

  useEffect(() => {
    if (result.data){
      getBooks({variables:{genre: result.data.me.favoriteGenre}})
    }
  }, [result]) //eslint-disable-line

  if (!show) {
    return null
  }

  console.log('result', result)
  console.log('result2', result2)

  if (result.loading || result2.loading) {
    return(
      <div>loading...</div>
    )
  }

  console.log('result data', result.data)
  console.log('result2 data', result2.data)

  return(
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>result.data.me.favoriteGenre</b></p>
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
          {result2.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
} 


export default Recommendations