import { Box, Typography, List, ListItem, TextField, Button, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import { useUser } from '../components/context/UserContext'
import { getLists, createList, updateList, deleteList } from '../api'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { NavLink } from 'react-router-dom'
import { buttonStyle } from '../themes/Theme'

export default function Archive() {
  const { user } = useUser()
  const [lists, setLists] = useState([])
  const [newListName, setNewListName] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  // FETCH LISTS
  useEffect(() => {
    // console.log(user?.first_name)
    if (!user?.first_name) return
    const fetchLists = async () => {
      try {
        const data = await getLists(user.id)
        setLists(data)
      } catch {
        setError("Failed to load lists. Make sure you're logged in.")
      } finally {
        setLoading(false)
      }
    }
    fetchLists()
  }, [user])

  // CREATE LIST
  const handleCreateList = async () => {
    if (!newListName.trim()) return setError("List name cannot be empty")
    try {
      const newList = await createList(user.id, newListName)
      setLists((prev) => [...prev, newList])
      setNewListName("")
      setError("")
    } catch {
      setError("Failed to create list")
    }
  }

  // EDITING
  const startEditing = (list) => { setEditingId(list.id); setEditingName(list.name) }
  const cancelEditing = () => { setEditingId(null); setEditingName("") }
  const saveEditing = async (listId) => {
    if (!editingName.trim()) return setError("List name cannot be empty")
    try {
      const updated = await updateList(listId, { name: editingName })
      setLists(prev => prev.map(l => l.id === listId ? {...l, name: updated.data.name} : l))
      cancelEditing()
      setError("")
    } catch {
      setError("Failed to update list")
    }
  }

  // DELETE
  const handleDelete = async (listId) => {
    try {
      await deleteList(listId)
      setLists(prev => prev.filter(l => l.id !== listId))
    } catch {
      setError("Failed to delete list")
    }
  }

  return (
<Box sx={{ p: 4 }}>
  <Typography variant="h4" sx={{ mb: 3 }}>
    Your Lists
  </Typography>

  {!user?.id ? (
    <>
      <Typography>Please login to create your own lists</Typography>
      <Button component={NavLink} to="/login" sx={{...buttonStyle, mt: 5}}>Login here</Button>
    </>
  ) : (
    <>
      {/* Create New List */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="New List Name"
          variant="outlined"
          size="small"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",       // input text color
            },
            "& .MuiInputLabel-root": {
              color: "white",       // label color
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // border color
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // hover border
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // focused border
            }
          }}
        />
        <Button onClick={handleCreateList} variant="contained" sx={buttonStyle}>
          Create List
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Lists */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : lists.length === 0 ? (
        <Typography>You don't have any lists yet...</Typography>
      ) : (
        <List>
          {lists.map((list) => (
            <ListItem
              key={list.id}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              {editingId === list.id ? (
                <>
                  <TextField
                    size="small"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    sx={{
                    "& .MuiInputBase-input": {
                    color: "white",       // input text color
                    },
                    "& .MuiInputLabel-root": {
                    color: "white",       // label color
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // border color
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // hover border
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // focused border
                    }
                    }}
                  />
                  <IconButton onClick={() => saveEditing(list.id)}>
                    <SaveIcon sx={{color: "white"}} />
                  </IconButton>
                  <IconButton onClick={cancelEditing}>
                    <CancelIcon sx={{color: "white"}} />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography sx={{ flexGrow: 1 }}>{list.name}</Typography>
                  <IconButton onClick={() => startEditing(list)}>
                    <EditIcon sx={{color: "white"}} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(list.id)}>
                    <DeleteIcon sx={{color: "white"}} />
                  </IconButton>
                  <Button component={NavLink} to={`/list/${list.id}`} sx={buttonStyle}>
                    View
                  </Button>
                </>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </>
  )}
</Box>

  )
}
