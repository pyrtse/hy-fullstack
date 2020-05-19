import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

const Filter = ({ handleFilterChange, filter }) => {
  return (
    <div>filter shown with<input
      value={filter}
      onChange={handleFilterChange}
    />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange} />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button id={person.id} onClick={deletePerson}>delete</button>
    </div>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person, i) => <Person key={i} person={person} deletePerson={deletePerson} />)}
    </div>
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
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        console.log('response data: ')
        console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
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
                setPersons(newPersons)
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
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${returnedPerson.name}`)
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

  const deletePerson = (event) => {
    persons.find(person => console.log(person.id))
    console.log(persons)
    const personToDelete = persons.find(person => person.id === event.target.id)
    if (window.confirm(`delete ${personToDelete.name}?`)) {
      personService.deletePerson(event.target.id)
        .then(response => {
          personService.getAll()
            .then(newPersons => {
              setPersons(newPersons)
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
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new </h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )

}

export default App