import React from 'react'
import { createAnecdote } from '.././reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '.././services/anecdotes'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote)
        
      }
    

    return (<div>
        <h2>create new</h2><form onSubmit={addAnecdote}>
    <div><input name="anecdote"/></div>
    <button type="submit">create</button>
  </form>
  </div>)
}

const mapStateToProps = (state) => {
    // sometimes it is useful to console log from mapStateToProps
    return {
      anecdotes: state.anecdotes,
    }
  }

  const mapDispatchToProps = {
    createAnecdote,
  }


  export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteForm)