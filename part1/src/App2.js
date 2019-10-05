import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>
  <button onClick={props.handleClick}>{props.text}</button>

const StateValues = (props) => <h2>{props.text} {props.value}</h2>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    setGood(newValue)
  }
  const setToNeutral = (newValue) => {
    setNeutral(newValue)
  }
  const setToBad = (newValue) => {
    setBad(newValue)
  }

  const findAverage = () => {
    return ((good-bad)/(good+neutral+bad))
  }

  const statistics = () => {
  if(good>0 || bad>0 || neutral >0) return <div>
    <StateValues text="all" value={good + neutral + bad}></StateValues>
    <StateValues text ="average" value ={findAverage()}></StateValues>
    </div>
  else return <h2>No Statistics</h2>
}

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)}  text="good"></Button>
      <Button handleClick={() => setToNeutral(neutral + 1)}  text="Neutral"></Button>
      <Button handleClick={() => setToBad(bad + 1)}  text="Bad"></Button>

      <br />

      <StateValues text={"good"} value={good}></StateValues>
      <StateValues text={"neutral"} value={neutral}></StateValues>
      <StateValues text="bad" value={bad}></StateValues>

      <br />

      {statistics()}
    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
