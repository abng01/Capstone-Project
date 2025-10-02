import { useUser } from "../components/context/UserContext"
import { useState } from "react"
import { Box, TextField, Button, Typography, Divider } from '@mui/material'
import { inputFieldStyle, buttonStyle } from "../themes/Theme"
import { NavLink } from "react-router-dom"

export default function LoginPage() {
  const { login, user, logout } = useUser()
  const [username, setUsername] = useState("")

  return (
    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, pt: 10 }}>
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 5}}>
        <Typography variant="h6" sx={{mb: 3, color: "white", }}>Already have an account?</Typography>
        <Button component={NavLink} to="/signup" sx={buttonStyle}>Sign up</Button>
      </Box>
      <Divider sx={{ borderColor: "#d7b478ff", mb: 5, width: "50%", mx: "auto"}} />
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 10}}>
        <TextField label="Username" variant="filled" sx={inputFieldStyle}/>
        <TextField label="Password" variant="filled" sx={inputFieldStyle}/>
      </div>
      <Button sx={{...buttonStyle, mt: 5}}>Login</Button>
    </Box>
  )
}
