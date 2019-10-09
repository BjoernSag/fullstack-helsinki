import anecdoteService from '.././services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type){
    case 'INCREMENT':
      const anecdoteToChange = state.find(n => n.id === action.data.id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes+1
      }
      
      const newState = state.map(anecdote => 
        anecdote.id!==action.data.id ? anecdote : changedAnecdote)
      return newState
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export const createAnecdote = (data) => {
  return {
    type:'NEW_ANECDOTE',
    data,
    }
}

export const incrementOne = (newId) => {
  return {
      type:'INCREMENT',
      data: {
          id: newId
      }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
    data: anecdotes,
    })
    
  }
}
export default reducer