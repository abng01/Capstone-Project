import { Box, TextField, Typography, Divider, Button } from '@mui/material'
import { inputFieldStyle, buttonStyle } from '../themes/Theme'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signupUser } from '../api'

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await signupUser(formData)
      alert(response.message)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "50%", margin: "auto", pt: 5 }}>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
        <Typography variant="h6" sx={{mb: 3, color: "white"}}>Already have an account?</Typography>
        <Button component={NavLink} to="/login" sx={buttonStyle}>Login</Button>
      </Box>
      <Divider sx={{ borderColor: "#d7b478ff", mb: 5 }} />

      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <TextField
          label="First name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          variant="filled"
          sx={{...inputFieldStyle, width: "45%"}}
        />
        <TextField
          label="Last name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          variant="filled"
          sx={{...inputFieldStyle, width: "45%"}}
        />
      </Box>

      <TextField
        label="Email address"
        name="email"
        value={formData.email}
        onChange={handleChange}
        variant="filled"
        sx={{ ...inputFieldStyle, width: "100%", mt: 5}}
      />

      <Box sx={{display: "flex", justifyContent: "space-between", mt: 5}}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="filled"
          sx={{...inputFieldStyle, width: "45%"}}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="filled"
          sx={{...inputFieldStyle, width: "45%"}}
        />
      </Box>

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      <Button
        sx={{...buttonStyle, maxWidth: "20%", margin: "auto", mt: 5}}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </Button>
    </Box>
  )
}
