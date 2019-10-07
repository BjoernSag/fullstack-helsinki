import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NoteForm from './NoteForm'
import '@testing-library/jest-dom/extend-expect'

const Wrapper = (props) => {

    const onChange = (event) => {
      props.state.value = event.target.value
    }
  
    return (
      <NoteForm
        value={props.state.value}
        onSubmit={props.onSubmit}
        handleChange={onChange}
      />
    )
  } 

  test('<NoteForm /> updates parent state and calls onSubmit', () => {
    const onSubmit = jest.fn()
    const state = {
      value: ''
    }
  
    const component = render(
      <Wrapper onSubmit={onSubmit} state={state} />
    )
  
    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')
  
    fireEvent.change(input, { target: { value: 'testing of forms could be easier' } })
    fireEvent.submit(form)
  
    expect(onSubmit.mock.calls.length).toBe(1)
    expect(state.value).toBe('testing of forms could be easier')  
  })