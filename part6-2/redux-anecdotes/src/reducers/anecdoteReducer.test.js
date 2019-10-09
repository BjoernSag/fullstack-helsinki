import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('unicafe reducer', () => {
    
      test('good is incremented', () => {
        const action = {
          type: 'GOOD'
        }
        const state = initialState
    
        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
          good: 1,
          ok: 0,
          bad: 0
        })
      })