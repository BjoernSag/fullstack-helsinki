import React from 'react'
const Blog = ({ blog, onLikesChange }) => {
	const blogStyle = {
		display: 'grid',
		gridTemplateColumns: '3fr 1fr 10fr'

	}

	return (<div style={blogStyle}>
		<h2>{blog.title}</h2>
		<h4>{blog.author}</h4>
		<h4>{blog.url}</h4>
		<h5>Likes: {blog.likes}</h5>
    <h5>{blog.id}</h5>
		<button onClick={() => onLikesChange}>like</button>
	</div>)
}

export default Blog