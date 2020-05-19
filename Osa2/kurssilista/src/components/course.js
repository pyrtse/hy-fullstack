import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h2>{props.course.name}</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    return(
      <div>
        <p>
          {props.part} {props.excercises}
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return(
      <div>
        {parts.map((part, i)=>
          <Part key={i} part={part.name} excercises={part.exercises}/>
          )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
  
    const total = parts.reduce((a, b) => a + b.exercises, 0)
    
    return(
      <div>
        <b>Total of excercises {total}</b>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return(
      <div>
        <Header course={course}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course