import React from "react";
import ReactDOM from "react-dom";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBase2 extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBase2 {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase2 {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase2 {
  name: "Fourth part"
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;


const Header: React.FC<{name: string}> = ({name}) =>{
  return (<h1>{name}</h1>)
}

const Part: React.FC<{coursePart: CoursePart}> = ({coursePart}) => {
  switch(coursePart.name){
    case "Fundamentals":
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description}</p>
    case "Using props to pass data":
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}</p>
    case "Deeper type usage":
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.exerciseSubmissionLink} {coursePart.description}</p>
    case "Fourth part":
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description}</p>
    default: 
      return assertNever(coursePart)
  }
  
}

const Content: React.FC<{courseParts: Array<CoursePart>}> = ({courseParts}) =>{
  return (
    <div>
      {courseParts.map(coursePart => <Part key={coursePart.name} coursePart={coursePart}/>)}
    </div>
  )
}

const Total: React.FC<{courseParts: Array<CoursePart>}> = ({courseParts}) => {
  return (
    <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}



const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "Fourth part",
    exerciseCount: 4,
    description: "new course"
  }
];

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));