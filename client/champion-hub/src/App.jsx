import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { CssBaseline } from '@mui/material'
import Launchpage from './pages/LaunchPage'
import AppRoutes from './routes/AppRoutes'
import { useUser } from './components/context/UserContext'

function App() {
  const { user, loading, isLaunched, setIsLaunched } = useUser()

  if (loading) return <p>Loading...</p>

  return (
    <>
      {isLaunched ? (
        <>
          <NavBar />
          <div style={{ marginTop: "12em" }}>
            <AppRoutes />
          </div>
        </>
      ) : (
        <Launchpage onEnter={setIsLaunched} />
      )}
    </>
  )
}

export default App
