import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import { useAuth } from './contexts/auth/useAuth'
import Login from './pages/Login'

const App = () => {
  const { isAuthenticated } = useAuth()
  console.log(isAuthenticated)
  return (
    <div className=''>
      <h1>authentication</h1>

      {
        isAuthenticated ? <button>Logout</button> : <button>no user found</button>
      }

      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App