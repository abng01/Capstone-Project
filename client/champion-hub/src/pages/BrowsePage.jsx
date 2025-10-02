import { Card, CardContent, CardMedia, Typography, CardActions, Modal, Button, Grid, Box, Pagination, Container } from "@mui/material"
import logo from "../assets/League of Legends Icon.png"
import { NavLink } from "react-router-dom"
import { buttonStyle } from "../themes/Theme"
import { getChampions, getAbilities, addChamp, getLists } from "../api"
import { useState, useEffect } from "react"
import { useUser } from "../components/context/UserContext"

export default function BrowsePage() {
  const [champions, setChampions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const championsPerPage = 12 // number of champions per page
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedChamp, setSelectedChamp] = useState(null)
  const [abilities, setAbilities] = useState([])
  const { user } = useUser()
  const [userLists, setUserLists] = useState([])

  // Fetch champions on mount
  useEffect(() => {
    getChampions()
      .then(data => setChampions(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

    useEffect(() => {
    getAbilities()
      .then(data => setAbilities(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
  if (isModalOpen && user?.id) {
    getLists(user.id)
      .then(data => setUserLists(data))
      .catch(err => console.error(err))
  }
}, [isModalOpen, user])

  if (loading) return <p>Loading...</p>

  const totalPages = Math.ceil(champions.length / championsPerPage)

  // Get champions for the current page
  const indexOfLast = currentPage * championsPerPage
  const indexOfFirst = indexOfLast - championsPerPage
  const currentChampions = champions.slice(indexOfFirst, indexOfLast)
  const currentChampionIds = currentChampions.map(c => c.id)
  const currentChampionAbilities = abilities.filter(a => currentChampionIds.includes(a.champion_id))
  const selectedChampAbilities = currentChampionAbilities.filter(a => selectedChamp?.id === a.champion_id)

  const removeHTML = (html) => {
      return html.replace(/<[^>]*>/g, "")
  }

  const getDifficulty = (difficulty) => {
    if (difficulty <= 3) return 1
    if (difficulty <= 6) return 2
    return 3
  }

  const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

  const AddChampionModal = () => {
  if (!selectedChamp) return null

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        maxHeight: "80vh",
        overflowY: "auto",
        backgroundColor: "rgba(32, 35, 46, 0.96)",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        borderRadius: 25,
        padding: 20,
      }}
    >
      <Typography variant="h4" sx={{ color: "white", mb: 1 }}>
        {selectedChamp.name}
      </Typography>
      <Typography sx={{ color: "white", fontSize: 18, mb: 2 }}>
        {capitalize(selectedChamp.title)}
      </Typography>

      {selectedChampAbilities.length > 0 && (
        <ul style={{ textAlign: "left", color: "white", marginBottom: 20 }}>
          {selectedChampAbilities.map((a) => (
            <li key={a.id}>
              {a.name} {a.type === "Passive" ? "(Passive)" : ""} - {removeHTML(a.description)}
            </li>
          ))}
        </ul>
      )}

      {user?.id ? (
        <>
          <Typography sx={{ color: "white", mb: 1 }}>Select a list:</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3, alignItems: "center" }}>
            {userLists.map((list) => (
              <Button
                key={list.id}
                sx={{ ...buttonStyle, display: "flex", justifyContent: "flex-start", maxWidth: "50%" }}
                onClick={async () => {
                  try {
                    await addChamp(list.id, selectedChamp.id)
                    alert(`Added ${selectedChamp.name} to ${list.name}`)
                    setIsModalOpen(false)
                  } catch {
                    alert("Failed to add champion")
                  }
                }}
              >
                {list.name}
              </Button>
            ))}
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ color: "white" }}>
            Please log in to add champions to a list.
          </Typography>
          <Button
            component={NavLink}
            to="/login"
            sx={{ ...buttonStyle, display: "flex", justifyContent: "flex-start", maxWidth: "20%", alignItems: "center" }}
            onClick={() => setIsModalOpen(false)}
          >
            Login
          </Button>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button sx={buttonStyle} onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
      </Box>
    </div>
  )
}

  return (
    <>
      <Typography variant="h5" align="left" sx={{ marginBottom: 4, textAlign: "center" }}>
        Browse all champions:
      </Typography>

    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 8 }, width: "100%", display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2} sx={{justifyContent: "center"}}>
            {currentChampions.map((champion) => {
            const filled = getDifficulty(champion.difficulty)
            return (
                <Grid key={champion.id}>
                <Card
                    sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#363F55",
                    }}
                >
                    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CardMedia
                        component="img"
                        sx={{ height: 100, width: 100 }}
                        image={logo} // use API image if exists, fallback to logo
                        title={champion.name}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography variant="h6" sx={{ color: "white" }}>
                        {champion.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ color: "white", m: 0 }}>Difficulty: </Typography>
                        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", marginLeft: 1 }}>
                            {[1, 2, 3].map((i) => (
                            <Box
                                key={i}
                                sx={{
                                width: 15,
                                height: 15,
                                borderRadius: "50%",
                                backgroundColor: i <= filled ? "#84BEFF" : "#5F738B",
                                mt: 0,
                                }}
                            />
                            ))}
                        </Box>
                        </Box>
                    </Box>
                    </CardContent>

                    <CardActions sx={{ display: "flex", justifyContent: "center", gap: 2, pb: 3 }}>
                    <Button component={NavLink} to={'/view/' + champion.id} sx={buttonStyle}>
                        View
                    </Button>
                    <Button onClick={() => {setIsModalOpen(true); setSelectedChamp(champion)}} sx={buttonStyle}>Add</Button>
                    </CardActions>
                </Card>
                </Grid>
            )
            })}
          {isModalOpen && <AddChampionModal />}
        </Grid>
      </Container>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            sx={{
                "& .MuiPaginationItem-root": {
                    color: "white",
                    borderColor: "white",
                },
                "& .Mui-selected": {
                    backgroundColor: "#84BEFF",
                    color: "#000",
                },
            }}
        />
        </Box>
      )}
    </>
  )
}
