import { Box, TextField, Typography, Divider, Button } from '@mui/material'
import { inputFieldStyle, buttonStyle } from '../themes/Theme'
import { NavLink } from 'react-router-dom'

export default function Signup() {

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", width: "50%", margin: "auto", pt: 5}}>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                    <Typography variant="h6" sx={{mb: 3, color: "white", }}>Already have an account?</Typography>
                    <Button component={NavLink} to="/login" sx={buttonStyle}>Login</Button>
                </Box>
                <Divider sx={{ borderColor: "#d7b478ff", mb: 5 }} />            
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <TextField label="First name" variant="filled" sx={{...inputFieldStyle, width: "45%"}} />
                    <TextField label="Last name" variant="filled" sx={{...inputFieldStyle, width: "45%"}} />
                </Box>

                <TextField label="Email address" variant="filled" sx={{ ...inputFieldStyle, width: "100%", mt: 5}} />

                <Box sx={{display: "flex", justifyContent: "space-between", marginTop: 5}}>
                    <TextField label="Username" variant="filled" sx={{...inputFieldStyle, width: "45%"}} />
                    <TextField label="Password" type="password" variant="filled" sx={{...inputFieldStyle, width: "45%"}} />
                </Box>
            </Box>
            <Button sx={{...buttonStyle, mt: 10, justifyContent: "space-between", alignItems: "flex-start"}}>Sign up</Button>
        </>
    )
}