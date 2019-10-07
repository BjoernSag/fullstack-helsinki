import React, { useEffect, useState } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Blog from './components/Blog'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField} from './hooks/index'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newLikes, setNewLikes] = useState('')
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const rows = () => blogs.map(blog => {
    return <Togglable key={blog.id}
      buttonLabel={blog.title}>
      <Blog
        blog={blog}
        onLikesChange={() => handleLikeChange}
        key={blog.id}
      /></Togglable>


  }
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleLikeChange = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 2,
      userId: '5d9867f7f104a205a4949e07'
    }
    blogService
      .update('5d9ab392242e6e38b8b7b2cd',blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
      })
    return newLikes
  }

  const addBlogPost = (event) => {
    event.preventDefault()
    const blogObject =  {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      userId: '5d9867f7f104a205a4949e07'
    }
    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })


  }


  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{user.name} logged in</p>
          <button type="submit" onClick={() => { logout()}}>logout</button>
          <Togglable buttonLabel="new BlogPost">
            <BlogForm
              onSubmit={addBlogPost}
              newTitleValue={newTitle}
              newAuthorValue={newAuthor}
              newUrlValue={newUrl}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
            />
          </Togglable>
          <h3>
            Blogs:
            {rows()}
          </h3>
        </div>}



    </div>
  )
}

export default App