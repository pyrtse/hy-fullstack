import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

const Notification = ({ error, message }) => {
  if (message !== null) {
    if (error) {
      return (
        <div className="error">{message}</div>
      )
    } else {
      return (
        <div className="notification">{message}</div>
      )
    }
  }
  return (
    <div></div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <p>{person.name} {person.number} <button id={person.id} onClick={deletePerson}>delete</button></p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll().then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = event => {
    setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const oldPerson = persons.find(person => person.name === newName)
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
          .update(oldPerson.id, personObject)
          .then(updatedPerson => {
            setMessage(`Number changed for ${updatedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 2000);
            personService.getAll()
              .then(newPersons => {
                setPersons(newPersons.data)
              })
          })
          .catch(error => {
            setMessage(`Error in changing number for ${personObject.name}`)
            setError(true)
            setTimeout(() => {
              setMessage(null)
              setError(false)
            }, 2000)
          })
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson.data))
          setMessage(`Added ${returnedPerson.data.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setMessage(error.response.data.error)
          setError(true)
          setTimeout(() => {
            setMessage(null)
            setError(false)
          }, 2000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deletePerson = (event) => {
    persons.find(person => console.log(person.id))
    console.log(persons)
    const personToDelete = persons.find(person => person.id.toString() === event.target.id)
    console.log(event.target.id)
    console.log(personToDelete)
    if (window.confirm(`delete ${personToDelete.name}?`)) {
      personService.deletePerson(event.target.id)
        .then(response => {
          personService.getAll()
            .then(newPersons => {
              console.log(newPersons)
              setPersons(newPersons.data)
              setMessage(`${personToDelete.name} deleted`)
              setTimeout(() => {
                setMessage(null)
              }, 2000)
            })
        })
        .catch(error => {
          setMessage(`Error deleting ${personToDelete.name}`)
          setError(true)
          setTimeout(() => {
            setMessage(null)
            setError(false)
          }, 2000)
        })
    }
  }

  const personsToShow = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      filter shown with <input value={filter} onChange={handleFilterChange} />
      <h2>add new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) =>
        <Person person={person} deletePerson={deletePerson} />
      )}
    </div>
  )

}

export default App