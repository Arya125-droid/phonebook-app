import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [info, setInfo] = useState({ message: null, type: 'success' })

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  const notify = (message, type = 'success') => {
    setInfo({ message, type })
    setTimeout(() => {
      setInfo({ message: null, type: 'success' })
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
      // if (confirmUpdate) {
      //   const changedPerson = { ...existingPerson, number: newNumber }
      //   personService
      //     .update(existingPerson.id, changedPerson)
      //     .then(returnedPerson => {
      //       setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
      //       notify(`Updated ${returnedPerson.name}'s number`)
      //       setNewName('')
      //       setNewNumber('')
      //     })
      //     .catch(error => {
      //       notify(`Information of ${newName} has already been removed from server`, 'error')
      //       setPersons(persons.filter(p => p.id !== existingPerson.id))
      //     })
      // }
      return
    }

    const personObject = { name: newName, number: newNumber }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notify(`Added ${returnedPerson.name}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        notify(`Error: ${error.response.data.error}`, 'error')
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={info.message} type={info.type} />
      
      <Filter 
        searchName={search} 
        handleSearch={(event) => setSearch(event.target.value)} 
      />
      
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={(e) => setNewName(e.target.value)} 
        newNumber={newNumber} 
        handleNumberChange={(e) => setNewNumber(e.target.value)} 
      />

      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        filter={search} 
        setPersons={setPersons} 
      />
    </div>
  )
}

export default App