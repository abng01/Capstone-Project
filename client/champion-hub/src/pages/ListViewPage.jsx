// ListViewPage.jsx
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getListById } from "../api"
import { Box, Typography, IconButton, Grid, Card, CardContent, CardMedia, Button } from "@mui/material"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import placeholder from "../assets/Placeholder_view_vector.svg.png"
import { removeChampFromList } from "../api"

export default function ListViewPage() {
  const { id } = useParams() // list id
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

    const fetchList = async () => {
        try {
            setLoading(true)
            const data = await getListById(id)
            setList(data)
        } catch (err) {
        console.error("Failed to fetch list:", err)
            setError("Failed to load list")
        } finally {
            setLoading(false)
        }
    }   

    useEffect(() => {
        fetchList()
    }, [id])

    const handleRemoveChampion = async (listId, champId) => {
        try {
            await removeChampFromList(listId, champId)

            alert("Champion removed from list")
            await fetchList() 
        } catch (err) {
            console.error("Failed to remove champion:", err)
            alert("Failed to remove champion")
        }
    }

  if (loading) return <p>Loading...</p>
  if (!list) return <p>List not found</p>

  return (
    <Box sx={{ p: 4 }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.2)" }
        }}
      >
        <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 50, color: "#D8BF78" }} />
      </IconButton>

      <Typography variant="h4" sx={{ mb: 2 }}>{list.name}</Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>Champions in this list:</Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2} sx={{display: "flex", justifyContent: "center"}}>
        {list.champions.map(champ => (
          <Grid item key={champ.id}>
            <Card sx={{ backgroundColor: "#363F55", color: "white" }}>
              <CardMedia
                component="img"
                height="140"
                image={placeholder} // champion image if available
                alt={champ.name}
              />
              <CardContent>
                <Typography variant="h6">{champ.name}</Typography>
                <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                  {champ.title}
                </Typography>
                <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={() => handleRemoveChampion(list.id, champ.id)}>
                Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
