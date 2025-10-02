import { useParams } from "react-router-dom"
import { Card, CardContent, Box, Container, Typography, IconButton, ListItem, List, Modal, Button } from "@mui/material"
import placeholder from "../assets/Placeholder_view_vector.svg.png"
import Abilities from "../components/Abilities"
import { textStyle, spanStyle, buttonStyle } from "../themes/Theme"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { useNavigate } from "react-router-dom"
import FlareIcon from '@mui/icons-material/Flare'
import React, { useEffect, useState } from 'react'
import { getChampions, getAbilities } from "../api"
import { useUser } from "../components/context/UserContext"
import { addChamp, getLists } from "../api"

export default function ViewPage() {
    const params = useParams()
    const champId = params.id
    const navigate = useNavigate()
    const [champions, setChampions] = useState([])
    const [champAbilities, setChampAbilities] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useUser()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userLists, setUserLists] = useState([])

    useEffect(() => {
        getChampions()
            .then(data => setChampions(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        getAbilities()
            .then(data => setChampAbilities(data))
            .catch(err => console.error("Error fetching abilities:", err))
    }, [])

    useEffect(() => {
        if (isModalOpen && user?.id) {
            getLists(user.id)
            .then(data => setUserLists(data))
            .catch(err => console.error(err))
        }
        }, [isModalOpen, user])

    const removeHTML = (html) => {
        return html.replace(/<[^>]*>/g, "")
    }

    if (loading) return <p>Loading...</p>

    const champion = champions.find(i => i.id.toString() === champId)
    if (!champion) return <p>Champion not found.</p>

    const abilities = champAbilities.filter(ability => ability.champion_id.toString() === champId)
    const passive = abilities.find(ability => ability.type === "Passive")

    
    return(
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8, p: { xs: 2, md: 4 } }, pb: { xs: 4, sm: 6, md: 10 } }}>
            <IconButton onClick={() => navigate('/browse')}sx={{display: "flex", justifyContent: "flex-end", transition: "transform 0.2s ease-in-out", "&:hover": {transform: "scale(1.2)"}}}>
                <KeyboardDoubleArrowLeftIcon sx={{fontSize: 50, color: "#D8BF78"}}/>
            </IconButton>
            <Card sx={{ backgroundColor: "#3F4555", width: "100%", maxWidth: 1200, mx: "auto", mb: 10  }}>   
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1}}>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 3 }}>
                        <Box component="img" src={placeholder} title="Champion Image" sx={{float: "left", p: 3,  minWidth: { xs: "90%", sm: "90%", md: 350, lg: 500 }, "@media (max-width: 1200px)": { width: "90%" } }} />

                        <Box sx={{ display: "flex", flexDirection: "column", pt: 4}}>
                            <Typography sx={textStyle}>
                                <span style={spanStyle}>Name: </span>{champion.name}
                            </Typography>
                            <Typography sx={textStyle}>
                                <span style={spanStyle}>Title: </span>
                                <span style={{ textTransform: "capitalize" }}>{champion.title}</span>
                            </Typography>
                            <Typography sx={textStyle}>
                                <span style={spanStyle}>Lore: </span>{champion.lore}
                            </Typography>
                            <Typography sx={textStyle}>
                                <span style={spanStyle}>Type: </span>
                                {champion.type.join(", ")}
                            </Typography>
                        </Box>
                    </Box>

                    
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography sx={textStyle}>
                            <span style={spanStyle}>Passive: </span>  
                            {passive ? `${passive.name} - ${removeHTML(passive.description)}` : "Loading..."}                             
                        </Typography>
                        <Typography component="div" sx={{...textStyle, display: "flex"}}>
                            <span style={spanStyle}>Abilities: </span> <Abilities champId={champId}/>
                        </Typography>                        
                    </Box>

                    <Box>
                        <Typography component={Box} sx={textStyle}>
                            <span style={spanStyle}>Ally tips: </span>
                            {champion.ally_tips.map((tip, index) => (
                                <React.Fragment key={index}>
                                    <List sx={{display: "flex", alignItems: "center"}}>
                                        <FlareIcon sx={{fontSize: 18, color: "#edd79cff"}}/>
                                        <ListItem>{tip}</ListItem>
                                    </List>
                                </React.Fragment>
                            ))}
                        </Typography>
                        <Typography component={Box} sx={textStyle}>
                            <span style={spanStyle}>Enemy tips: </span>
                            {champion.enemy_tips.map((tip, index) => (
                                <React.Fragment key={index}>
                                    <List sx={{display: "flex", alignItems: "center"}}>
                                        <FlareIcon sx={{fontSize: 18, color: "#edd79cff"}}/>
                                        <ListItem>{tip}</ListItem>
                                    </List>
                                </React.Fragment>
                            ))}
                        </Typography>                               
                    </Box>
                </CardContent>
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <Box sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "rgba(32, 35, 46, 0.96)",
                        borderRadius: 3,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}>
                            {user?.id ? (
                                <>
                                    <Typography sx={{ color: "white", fontSize: 20 }}>
                                        Add {champion.name} to a list:
                                    </Typography>
                                        {userLists.map(list => (
                                        <Button key={list.id} sx={{ color: "white", justifyContent: "flex-start" }} onClick={async () => {
                                            try {
                                                await addChamp(list.id, champion.id);
                                                alert(`Added ${champion.name} to ${list.name}`);
                                                setIsModalOpen(false);
                                            } catch (err) {
                                                alert("Failed to add champion.");
                                            }
                                            }}>{list.name}</Button>
                                        ))}
                                        </>
                                        ) : (
                                        <>
                                        <Typography sx={{ color: "white" }}>
                                        Please login to add champions to a list.
                                    </Typography>
                                    <Button sx={{ color: "white" }} onClick={() => { window.location.href = "/login"; }}>Login</Button>
                                </>
                            )}
                        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    </Box>
                </Modal>
                <Button sx={{ ...buttonStyle, mb: 3 }} onClick={() => setIsModalOpen(true)}>Add to List</Button>
            </Card>
        </Container>
    )
}
