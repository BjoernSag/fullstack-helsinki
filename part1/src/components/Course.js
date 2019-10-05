import Header from './Header'
import React, { useState } from 'react'

const Course = ({ courses }) => {
  const higherRows = () => courses.map(course =>
    <div>
      <Header content={course.name}></Header>
      {rows(course)}
      <h4>Total of : {total(course)} exercises</h4>
    </div>
  )

  const rows = (course) => course.parts.map(note =>
    <li key={note.id}>
      {note.name} {note.exercises}
    </li>)

    const total = (course) => course.parts.reduce( (s, k) => {
      if(s.exercises === undefined){
        return (s + k.exercises)
      }else
        return (s.exercises + k.exercises)
    })

  return (
    <div>
      {higherRows()}
    </div>
  )
}

export default Course
