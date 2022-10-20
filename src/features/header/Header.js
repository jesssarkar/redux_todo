import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveNewTodo } from '../todos/todosSlice'

const initialValues = {
  orgin: "",
  destination: "",
};

const Header = () => {
  const [text, setText] = useState(initialValues)
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const handleChange = (e) => setText(e.target.value)

  const handleKeyDown = async (e) => {
    // If the user pressed the Enter key:
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
      // Create and dispatch the thunk function itself
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
      // And clear out the text input
      setText(initialValues)
      setStatus('idle')
    }
  }

  let isLoading = status === 'loading'
  let loader = isLoading ? <div className="loader" /> : null

  return (
    <header className="header">
      <form action="">
      <input
        label="orgin"
        name="orgin"
        className="new-todo"
        placeholder='Orgin'
        value={text.orgin}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <input
        label="destination"
        name="destination"
        className="new-todo"
        placeholder='Destination'
        value={text.destination}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      
      </form>
      {loader}
    </header>
  )
}

export default Header
