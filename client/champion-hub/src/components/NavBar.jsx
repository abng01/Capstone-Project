import { AppBar, Toolbar, Box, IconButton, Button, TextField, Menu, MenuItem, Avatar } from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom"
import PersonIcon from "@mui/icons-material/Person"
import logo from "../assets/League of Legends Icon.png"
import { activeButton, buttonStyle } from "../themes/Theme"
import React, { useState, useEffect } from 'react'
import { useUser } from '../components/context/UserContext'
import { getChampions } from '../api'

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [randomNum, setRandomNum] = useState(null)
  const [champions, setChampions] = useState([])
  const { user, logout, isAuthenticated } = useUser()
  const navigate = useNavigate()

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  useEffect(() => {
    getChampions()
      .then(data => setChampions(data))
      .catch(err => console.error(err))
  }, [])

  const generateRandomId = () => {
    if (champions.length === 0) return
    const randomIndex = Math.floor(Math.random() * champions.length)
    const randomChampion = champions[randomIndex]
    setRandomNum(randomChampion.id)
  }

  useEffect(() => {
    if (randomNum !== null) {
      navigate(`/view/${randomNum}`)
      setRandomNum(null)
    }
  }, [randomNum, navigate])

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1F2638", minHeight: "100px", justifyContent: "center" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
        
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavLink to="/dashboard">
            <img src={logo} alt="Logo" style={{ width: "100px" }} />
          </NavLink>
          <Button component={NavLink} to="/browse" style={({ isActive }) => (isActive ? activeButton : undefined)} sx={buttonStyle}>
            Browse
          </Button>
          <Button onClick={generateRandomId} sx={buttonStyle}>
            Random
          </Button>
        </Box>

        {/* Center (Searchbar) */}
        <Box sx={{ flexGrow: 1, maxWidth: 500, mx: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search champions..."
            sx={{
              backgroundColor: "white",
              borderRadius: 5,
              "& fieldset": { border: "none" }
            }}
          />
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button component={NavLink} to="/archive" style={({ isActive }) => (isActive ? activeButton : undefined)} sx={buttonStyle}>
            Archive
          </Button>

          <IconButton onClick={handleClick}>
            {isAuthenticated && user ? (
              user?.first_name ? <Avatar sx={{ bgcolor: "#d0c178ff" }}> {user.first_name[0].toUpperCase()} </Avatar> : <PersonIcon sx={{ fontSize: 40, color: "#d0c178ff" }} />
            ) : (
              <PersonIcon sx={{ fontSize: 40, color: "#d0c178ff" }} />
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            disableScrollLock
          >
            {!user?.first_name ? (
              [
                <MenuItem onClick={handleClose} component={NavLink} to="/signup">Sign up</MenuItem>,
                <MenuItem onClick={handleClose} component={NavLink} to="/login">Login</MenuItem>
              ]
            ) : (
              [
                <MenuItem onClick={handleClose} component={NavLink} to="/profile">My profile</MenuItem>,
                <MenuItem onClick={() => { logout(); handleClose(); navigate("/login") }}>Logout</MenuItem>
              ]
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
