import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
      
  )
}

const Statistics = ({good, neutral, bad}) => {
  if ((good + bad + neutral) === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={(good-bad)/(good + neutral + bad)} />
          <StatisticLine text="positive" value={(good)/(good + neutral + bad) * 100 + " %"}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const[bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return(
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodClick}/>
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
