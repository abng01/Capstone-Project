import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/Navbar'
import { CssBaseline } from '@mui/material'
import Launchpage from './pages/LaunchPage'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [isLaunched, setIsLaunched] = useState(false)

  const handleLaunch = () => {
    setIsLaunched(true)
  }

  return (
    <>
      {isLaunched ? (
        <>
          <NavBar />
          <div style={{ marginTop: "12em"}}>
            <AppRoutes />
          </div>
        </>
      ) : (
        <Launchpage onEnter={handleLaunch} />
      )}
    </>
  )
}

export default App
