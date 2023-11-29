import { useState } from 'react';
import Hello from './Hello'
import Login from './Login'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      isLoggedIn
      ?  <Hello/>
      : <Login/>
  )
}

export default App
