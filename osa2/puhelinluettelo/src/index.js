import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import personService from './services/persons'
import './index.css'

/*
npm install axios
npm install json-server --save-dev

package.json:
{
  // ... 
  "scripts": {
	// ... 
    "server": "json-server -p3001 --watch db.json"  },
}

npm run server
npm start

(error code ELIFECYCLE -> npm cache clean --force, delete node_modules, package-lock.json and install again with npm install)
*/

const Title = ({text}) => <h2>{text}</h2>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Persons = ({persons, handleDeletion}) => {
  const deleteperson = (id, name) => {
    if (window.confirm(`Delete '${name}' ?`)) {
      personService.deleteid(id).then(handleDeletion(name))
    }
  }

  return (
    <>
    {persons.map((person, i) => 
      <p key={i}>{person.name} {person.number} 
        <Button handleClick={() => deleteperson(person.id, person.name)} text='delete'/>
      </p>)
    }
   </>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ refresh, setRefresh] = useState(new Date())

  useEffect(() => {    
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [refresh])
  
  const showMessage = (message) => {
    setErrorMessage(message)        
    setTimeout(() => {setErrorMessage(null)}, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = { name: newName, number: newNumber }
  
    if (persons.some(elem => elem.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      personService
      .create(nameObject)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        showMessage(`${newName} added`)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => { 
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => { 
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleDeletion = (name) => {
    personService
    .getAll()
    .then(updatedPersons => {
      setPersons(updatedPersons)
      setRefresh(new Date())
    })
    showMessage(`${name} deleted`)
  }

  return (
    <div>
      <Title text="Phonebook" />
      <Notification message={errorMessage} />
      <PersonForm 
        onSubmit={addName} 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Title text="Numbers" />
      <Persons persons={persons} handleDeletion={handleDeletion} />
    </div>
  )

}


ReactDOM.render(<App />, document.getElementById('root'))