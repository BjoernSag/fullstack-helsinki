/* import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'Mart',
		url: 'vg.no',
		likes: '0'
	}

	const component = render(
		<Blog blog={blog} />
	)
    
    const element = component.getByText(
		'Component testing is done with react-testing-library'
	)
	expect(element).toBeDefined()


	
}) */