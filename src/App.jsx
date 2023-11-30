import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Hello from './Hello'
import Login from './Login'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {
        isLoggedIn
        ?  <Hello/>
        : <Login onLogin={setIsLoggedIn}/>
      }
      <ToastContainer />
    </>
  )
}

export default App
