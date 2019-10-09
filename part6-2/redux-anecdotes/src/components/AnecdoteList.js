import React from 'react'
import { setNotification, removeNotification} from '.././reducers/notificationReducer'
import { connect } from 'react-redux'
import { incrementOne } from '.././reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const vote = (id, content) => {
    props.incrementOne(id)
     props.setNotification(content)
    setTimeout(() =>
     props.removeNotification(id), 5000)
  }
  const anecdotes = props.anecdotes

    return (
    <div>
    <h2>Anecdotes</h2>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
        )}
      </div>
        
    )}

    const mapStateToProps = (state) => {
      // sometimes it is useful to console log from mapStateToProps
      return {
        anecdotes: state.anecdotes,
      }
    }

    const mapDispatchToProps = {
      removeNotification,
      setNotification,
      incrementOne
    }


    export default connect(
      mapStateToProps,
      mapDispatchToProps
      )(AnecdoteList)