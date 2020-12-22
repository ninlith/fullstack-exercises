import React from 'react'

const Header = ({ course }) => <h1>{course.name}</h1>
  
const Total = ({ course }) => {
  const total = course.parts.reduce( (s, p) => s + p.exercises , 0)

  return (
    <strong>total of {total} exercises</strong>
  ) 
}
  
const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = ({ course }) => (
  <div>
    {course.parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)
    
const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
)

export default Course