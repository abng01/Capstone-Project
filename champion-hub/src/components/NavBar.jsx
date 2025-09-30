import { AppBar, Toolbar, Box, IconButton, Button, TextField, Menu, MenuItem } from "@mui/material"
import { NavLink } from "react-router-dom"
import PersonIcon from "@mui/icons-material/Person"
import logo from "../assets/League of Legends Icon.png"
import { activeButton, buttonStyle } from "../themes/Theme"
import * as React from 'react'

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [randomNum, setRandomNum] = React.useState(1)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const num = () => setRandomNum(Math.floor(Math.random() * 171 + 1))

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1F2638", minHeight: "100px", justifyContent: "center"  }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100px" }}
            />
          </NavLink>
          <Button component={NavLink} to="/browse" style={({ isActive }) => (isActive ? activeButton : undefined)} sx={buttonStyle}>
            Browse
          </Button>
          <Button component={NavLink} to={`/view/${randomNum}`} onClick={() => num()} style={({ isActive }) => (isActive ? activeButton : undefined)} sx={buttonStyle}>
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
            <PersonIcon sx={{ fontSize: 40, color: "#d0c178ff" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose} component={NavLink} to="/profile">My account</MenuItem>
            <MenuItem onClick={handleClose} component={NavLink} to="/profile">Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
