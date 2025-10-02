import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid, Box } from "@mui/material"
import logo from "../assets/League of Legends Icon.png"
import { NavLink } from "react-router-dom"
import { buttonStyle } from "../themes/Theme"

export const champions = [
    { id: 1, name: "Ahri", difficulty: 7 },
    { id: 2, name: "Garen", difficulty: 3 },
    { id: 3, name: "Lux", difficulty: 9 },
    { id: 4, name: "Teemo", difficulty: 1 },
    { id: 5, name: "Ahri", difficulty: 5 },
    { id: 6, name: "Garen", difficulty: 8 },
    { id: 7, name: "Lux", difficulty: 2 },
    { id: 8, name: "Teemo", difficulty: 6 },
]

export default function BrowsePage() {

    const getDifficulty = (difficulty) => {
        if (difficulty <= 3) return 1
        if (difficulty <= 6) return 2
        return 3
    }

  return (
    <>
      <Typography variant="h5" align="left" sx={{ marginBottom: 4 }}>
        Browse all champions:
      </Typography>
      <Grid container spacing={2}>
        {champions.map((champion) => {
            const filled = getDifficulty(champion.difficulty)
            return (
                <Grid size={{sm: 6, xs: 12, md: 3 }} key={champion.id}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#363F55" }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CardMedia sx={{ height: 100, width: 100 }} image={logo} title="championimage" />
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Typography variant="h6" sx={{ color: "white" }}>{champion.name}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center"}}>
                                <Typography sx={{color: "white", m: 0 }}>Difficulty: </Typography>
                                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", marginLeft: 1 }}>
                                    {[1, 2, 3].map((i) => (
                                    <Box key={i} sx={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: i <= filled ? "#84BEFF" : "#5F738B", display: "inline-block", mt: 0 }}
                                    />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ display: "flex", justifyContent: "center", gap: 2, pb: 3 }}>
                        <Button component={NavLink} to={'/view/' + champion.id} sx={buttonStyle}>View</Button>
                        <Button sx={buttonStyle}>Add</Button>
                    </CardActions>
                    </Card>
                </Grid>
            )
        })}
      </Grid>
    </>
  )
}