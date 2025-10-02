import { Box, Typography, Button, Collapse } from "@mui/material"
import { buttonStyle, activeButton } from "../themes/Theme"
import { useState, useEffect } from "react"
import { getAbilities } from "../api"

export default function Abilities({ champId }) {
    
    const [expanded, setExpanded] = useState(null)
    const [champAbilities, setChampAbilities] = useState([])

    const handleChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : null)
    }

    const removeHTML = (html) => {
      return html.replace(/<[^>]*>/g, " ")
    }

    useEffect(() => {
        getAbilities()
            .then(data => setChampAbilities(data))
            .catch(err => console.error(err))
    }, [])

    const abilities = champAbilities.filter(i => i.champion_id.toString() === champId)

    return (
<Box sx={{ width: "100%" }}>
  {/* Buttons row */}
  <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start", marginLeft: 2 }}>
    {abilities
      .filter(a => a.type !== "Passive")
      .map((ability, index) => (
        <Button
          key={index}
          sx={{ ...buttonStyle, ...(expanded === index ? activeButton : {}) }}
          onClick={() => setExpanded(expanded === index ? null : index)}
        >
          {ability.type} ability
        </Button>
      ))}
  </Box>

  {/* Collapsible content */}
  <Collapse in ={expanded !== null} sx={{ mt: 2 }}>
      <Box sx={{ backgroundColor: "#303441ff", p: 2, borderRadius: 3, boxShadow: "inset 0px 2px 12px rgba(0, 0, 0, 0.13)"}}>
            {expanded !== null && (
                <>
                    <Typography variant="h7" sx={{fontWeight: "bold"}}>
                    {abilities.filter(a => a.type !== "Passive")[expanded].name}
                    </Typography>
                    <Typography variant="body2">
                    {removeHTML(abilities.filter(a => a.type !== "Passive")[expanded].description)}
                    </Typography>
                </>
            )}
      </Box>                 
  </Collapse>
</Box>

    )
}