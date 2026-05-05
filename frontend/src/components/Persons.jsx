import personService from "../services/persons"

const handleDelete = (id, setPersons, persons) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
        personService
            .deletePerson(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
                console.error('Error deleting person:', error)
                alert("This person is not in the server")
                setPersons(persons.filter(person => person.id !== id))
            })
    }
}
const Persons = ({ persons, filter, setPersons }) => {
    const filteredPersons = persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase()) || 
        person.number.includes(filter)
    )
    return (
        <ul>
        {filteredPersons.map((person) => 
            <li key={person.id}>
                {person.name} {person.number} 
                <button onClick={() => handleDelete(person.id, setPersons, persons)}>
                    delete
                </button>
            </li>
        )}
        </ul>
    )
}

export default Persons