import { HelmetProvider } from 'react-helmet-async';
import { useState } from 'react';
import Hello from './Hello'
import Login from './Login'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <HelmetProvider>
      {
        isLoggedIn
        ?  <Hello/>
        : <Login/>
      }
    </HelmetProvider>
  )
}

export default App
