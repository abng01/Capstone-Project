import { Box, Typography, Button, Collapse } from "@mui/material"
import { buttonStyle } from "../themes/Theme"
import { useState } from "react"

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

export default function Abilities() {
    const [expanded, setExpanded] = useState(null)

    const handleChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : null)
    }

    return (
<Box sx={{ width: "100%" }}>
  {/* Buttons row */}
  <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start", marginLeft: 2 }}>
    {abilities
      .filter(a => a.type !== "Passive")
      .map((ability, index) => (
        <Button
          key={index}
          sx={{ ...buttonStyle }}
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
                    {abilities.filter(a => a.type !== "Passive")[expanded].description}
                    </Typography>
                </>
            )}
      </Box>                 
  </Collapse>
</Box>

    )
}