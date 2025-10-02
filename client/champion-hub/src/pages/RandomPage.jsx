import { useParams } from "react-router-dom"
import { champions } from "./BrowsePage"
import { Card, CardContent, Box, Container, Typography, IconButton, ListItem, List } from "@mui/material"
import placeholder from "../assets/Placeholder_view_vector.svg.png"
import Abilities from "../components/Abilities"
import { textStyle, spanStyle } from "../themes/Theme"
import { useNavigate } from "react-router-dom"
import FlareIcon from '@mui/icons-material/Flare'
import React from 'react'

    const abilities = [
    {
        name: "Essence Theft",
        description:
            "Ahri gains a stack of Essence Theft whenever one of her abilities hits an enemy (max 3 stacks per ability). At 9 stacks, her next ability heals her for each enemy hit.",
        type: "Passive"
        },
        {
        name: "Orb of Deception",
        description:
            "Ahri sends out and pulls back her orb, dealing magic damage on the way out and true damage on the way back.",
        type: "Q"
        },
        {
        name: "Fox-Fire",
        description:
            "Ahri releases three fox-fires that lock onto and attack nearby enemies.",
        type: "W"
        },
        {
        name: "Charm",
        description:
            "Ahri blows a kiss that damages and charms an enemy it encounters, causing them to walk harmlessly towards her.",
        type: "E"
        },
        {
        name: "Spirit Rush",
        description:
            "Ahri dashes forward and fires essence bolts, damaging nearby enemies. Spirit Rush can be cast up to three times within a few seconds before going on cooldown.",
        type: "R"
        }        
    ]

export default function ViewPage() {
    const params = useParams()
    const champId = params.id
    const champion = {
        name: "Ahri",
        title: "the Nine-Tailed Fox",
        lore: `Innately connected to the magic of the spirit realm, Ahri is a fox-like vastaya who can manipulate her prey's emotions and consume their essence—receiving flashes of their memory and insight from each soul she consumes. Once a powerful yet wayward predator, Ahri is now traveling the world in search of remnants of her ancestors while also trying to replace her stolen memories with ones of her own making.`,
        type: ["Mage", "Assassin"],
        allyTips: [
            "Use Charm (E) to catch enemies out of position before committing with your full combo.",
            "Orb of Deception (Q) does true damage on the way back — time it to poke safely.",
            "Spirit Rush (R) can be used aggressively to finish kills or defensively to escape."
        ],
        enemyTips: [
            "Stay behind minions to avoid getting hit by Ahri's Charm.",
            "Bait out her Spirit Rush before committing to a fight — without it, she’s much easier to catch.",
            "Build magic resist items early to mitigate her burst damage."
        ]
    }
    const navigate = useNavigate()

    return(
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8, p: { xs: 2, md: 4 } }, pb: { xs: 4, sm: 6, md: 10 } }}>
            <Card sx={{ backgroundColor: "#3F4555", width: "100%", maxWidth: 1200, mx: "auto", mb: 10  }}>   
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1}}>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 3 }}>
                        <Box component="img" src={placeholder} title="Placeholder image for champion" sx={{float: "left", p: 3,  minWidth: { xs: "90%", sm: "90%", md: 350, lg: 500 }, "@media (max-width: 1200px)": { width: "90%" } }} />

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
                            {abilities[0].name} - {abilities[0].description}                            
                        </Typography>
                        <Typography component="div" sx={{...textStyle, display: "flex"}}>
                            <span style={spanStyle}>Abilities: </span> <Abilities />
                        </Typography>                        
                    </Box>

                    <Box>
                        <Typography component={Box} sx={textStyle}>
                            <span style={spanStyle}>Ally tips: </span>
                            {champion.allyTips.map((tip, index) => (
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
                            {champion.enemyTips.map((tip, index) => (
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
            </Card>
        </Container>
    )
}