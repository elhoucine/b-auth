import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Hello from './Hello'
import Login from './Login'
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer position='top-center' autoClose={1000*3}/>
    </>
  )
}

export default App
