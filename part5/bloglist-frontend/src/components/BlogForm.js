import React from 'react'

const BlogForm = ({ onSubmit,
  handleTitleChange,
  handleAuthorChange,
  newTitleValue,
  newAuthorValue,
  newUrlValue,
  handleUrlChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>Title</h2>
        <input
          value={newTitleValue}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <h2>Author</h2>
        <input
          value={newAuthorValue}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <h2>Url</h2>
        <input
          value={newUrlValue}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm