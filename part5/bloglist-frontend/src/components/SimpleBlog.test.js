import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import '@testing-library/jest-dom/extend-expect'

describe('<SimpleBlog />', () => {
	const blog = {
		title: 'This is a simple blog title',
		author: 'Mart',
		url: 'vg.no',
		likes: '4'
	}
	//this part is important because if not it throws "random" errors
	let component
	beforeEach(() => {
		component = render(
			<SimpleBlog blog={blog} />
		)
	})


	test('Test if it renders', () => {
		component.container.querySelector('.simple')
	})

	test('check if styles are rendered', () => {
		const div = component.container.querySelector('.title')

		expect(div).toHaveStyle('color: red;')
		component.debug()
	})

	test('title is shown', () => {
		expect(component.container).toHaveTextContent(
			'This is a simple blog title'
		)
	})

	/* test('Like button is pressed twice', () => {

        const mockHandler = jest.fn()

		const button = component.getByText('like it')
        fireEvent.click(button)
        fireEvent.click(button)
        fireEvent.click(button)
        
        expect(mockHandler.mock.calls.length).toBe(2)
	}) */


})