import lolText from "../assets/9eb028de391e65072d06e77f06d0955f66b9fa2c-736x316.png"
import { Box, Button, Grid } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"

export default function Launchpage({onEnter}) {
    const navigate = useNavigate()

    const handleBrowse = () => {
        onEnter()
        navigate("/browse")
    } 

    const handleLogin = () => {
        onEnter()
        navigate("/login")
    } 

    return (
        <>
            <Box sx={{ display: "flex", gap: 6, alignItems: "center", minHeight: "100%", position: "fixed", left: "200px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <img src={lolText} alt="LoL Text" style={{ width: "500px" }}/>
                    <h1 style={{ margin: "5px", fontSize: "62px", color: "#D8BF78" }}>Champions Hub</h1>
                </Box>

                <Box>
                    <Box sx={{ display: "flex", gap: 4 }}>
                        <Button onClick={handleBrowse} sx={{ backgroundColor: "#B38A43", px: 4, color: "#FFF2B4", textTransform: "capitalize", fontWeight: "bold", fontSize: "17px", py: 1.5, width: "300px", boxShadow: "0px 6px 14px #151412ff" }}>Browse Champions</Button>
                        <Button onClick={handleLogin} sx={{ backgroundColor: "#B38A43", px: 4, color: "#FFF2B4", textTransform: "capitalize", fontWeight: "bold", fontSize: "17px", py: 1.5, width: "300px", boxShadow: "0px 6px 14px #151412ff" }}>Login</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}