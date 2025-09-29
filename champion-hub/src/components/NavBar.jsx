import { AppBar, Toolbar, Box, IconButton, Button, TextField } from "@mui/material"
import { NavLink } from "react-router-dom"
import PersonIcon from "@mui/icons-material/Person"
import logo from "../assets/League of Legends Icon.png"

export default function NavBar() {
  const activeButton = {
    backgroundColor: "#9f8353ff",
    color: "#ffebc886",
    boxShadow: "inset 0px 4px 12px rgba(0,0,0,0.5)"
  }
  
  const buttonStyle = {
    backgroundColor: "#B38A43",
    px: 4,
    color: "#FFF2B4",
    textTransform: "capitalize",
    fontWeight: "bold"
  }

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
          <Button component={NavLink} to="/random" style={({ isActive }) => (isActive ? activeButton : undefined)} sx={buttonStyle}>
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
          <IconButton component={NavLink} to="/profile">
            <PersonIcon sx={{ fontSize: 40, color: "#d0c178ff" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
