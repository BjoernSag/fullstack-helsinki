import React from 'react'

const SimpleBlog = ({ blog, onClick }) => {
	const titleStyle = {
		color: 'red'
	}
	return <div className="simple" style={titleStyle}>
		<div className="title" style={titleStyle}>
			{blog.title}
		</div>
		<div className="author">
			{blog.author}
		</div>
		<div className="likes">
      blog has {blog.likes} likes
			<button onClick={onClick}>like it</button>
		</div>
	</div>
}

export default SimpleBlog