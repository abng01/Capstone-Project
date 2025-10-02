import { useState } from "react"
import { Box, TextField, Button, Typography, Divider } from "@mui/material"
import { inputFieldStyle, buttonStyle } from "../themes/Theme"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
// import { login } from "../api"
import { useUser } from "../components/context/UserContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(username, password);
      if (response.success) {
        navigate("/browse")
      } else {
        setError("Incorrect username or password")
      }
    } catch (message) {
      setError(message); // message is now just a string, not AxiosError
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" }, pt: 10 }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 5 }}>
        <Typography variant="h6" sx={{ mb: 3, color: "white" }}>
          Don't have an account?
        </Typography>
        <Button component={NavLink} to="/signup" sx={buttonStyle}>
          Sign up
        </Button>
      </Box>

      <Divider sx={{ borderColor: "#d7b478ff", mb: 5, width: "50%", mx: "auto" }} />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 10 }}>
        <TextField
          label="Username"
          variant="filled"
          sx={inputFieldStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="filled"
          sx={inputFieldStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button type="submit" sx={{ ...buttonStyle, mt: 5 }}>
        Login
      </Button>
    </Box>
  )
}
