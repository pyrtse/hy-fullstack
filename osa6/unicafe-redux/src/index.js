import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistics = () => {
  if (store.getState().good + store.getState().ok + store.getState().bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <div>all {store.getState().good + store.getState().ok + store.getState().bad}</div>
      <div>average {(store.getState().good - store.getState().bad)/(store.getState().good + store.getState().ok + store.getState().bad)}</div>
      <div>positive {((store.getState().good)/(store.getState().good + store.getState().ok + store.getState().bad)) * 100} % </div>
    </div>
  )
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <Statistics/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
