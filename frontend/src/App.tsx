import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import { AuthProvider,useAuth } from './context/AuthContext'
import { useState, type JSX, type ReactNode } from 'react'

import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterPage from './pages/RegisterPage'

type ProtectedRouteProps = {
  children:ReactNode,
}

function ProtectedRoute({children}:ProtectedRouteProps){

  const {user} = useAuth()

  return user?<>{user.username}</>:<Navigate to="/login"/>
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={< LoginPage />} />
          <Route path="/register" element={< RegisterPage />} />
          <Route path='/profile' 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
