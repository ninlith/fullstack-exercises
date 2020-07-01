import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Anecdote = ({ anecdote }) => <div>{anecdote}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(random_anecdote_index)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const random_anecdote = () => setSelected(random_anecdote_index)

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log(copy)
    setVotes(copy)
  }

  return (
    <div>
      <Header title="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={random_anecdote} text="next anecdote" />
      <Header title="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

const random_anecdote_index = () => Math.floor(Math.random()*anecdotes.length)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)