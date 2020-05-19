const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newState = {
        good: state.good +1, 
        ok: state.ok,
        bad: state.bad
      }
      return newState
    case 'OK':
      const okState = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
      return okState
    case 'BAD':
      const badState = {
        good: state.good,
        ok: state.ok,
        bad: state.bad +1 
      }
      return badState
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer