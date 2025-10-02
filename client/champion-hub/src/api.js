import axios from 'axios'

const api = axios.create({
    baseURL: "/api",
    withCredentials: true
})

const authApi = axios.create({
  baseURL: '/auth',
  withCredentials: true
})

const add = "http://localhost:3000/api"
const minus = "http://localhost:3000/auth"

export const getChampions = async () => {
    try {
        const response = await axios.get(add + "/champions")
        // console.log("API champions:", response.data.data)
        return response.data.data
    } catch (error) {
        console.error("Error fetching champions:", error)
        throw error
    }
}

export const getAbilities = async () => {
    try {
        const response = await axios.get(add + "/abilities")
        // console.log("API abilities:", response.data.data)
        return response.data.data
    } catch (error) {
        console.error("Error fetching abilities:", error)
        throw error
    }
}

// export const login = async (username, password) => {
//   try {
//     const response = await axios.post(minus + "/login", { username, password }, { withCredentials: true })
//     console.log(response.data)
//     return response.data
//   } catch (err) {
//     console.log(err)
//     throw err
//   }
// }

export const getUser = async (userId) => {
    try {
        const response = await axios.get(add + `/users/${userId}`)
        return response.data
    } catch (err) {
        console.error("Error fetching user:", err)
        throw err
    }
}

// Get all lists for a specific user
export const getLists = async (userId) => {
  try {
    const response = await axios.get(add + `/lists/user?user_id=${userId}`)
    return response.data.data
  } catch (err) {
    console.error("Error fetching lists:", err)
    throw err
  }
}

// Get list by list id
export const getListById = async (listId) => {
    try {
        const response = await axios.get(add + `/lists/${listId}`, { withCredentials: true })
        console.log(response)
        return response.data.data
    } catch (err) {
        console.error("Error fetching list:", err)
    }
}

// Create a new list for a user
export const createList = async (userId, name) => {
  try {
    const response = await axios.post(add + '/lists/create', { userId, name })

    return response.data.data
  } catch (err) {
    console.error("Error creating list:", err)
    throw err
  }
}

// Update list
export const updateList = async (listId, updatedData) => {
    try {
        const response = await axios.put(add + `/lists/${listId}`, updatedData, { withCredentials: true })
        return response.data
    } catch (err) {
        console.error("Error updating list:", err)
        throw err
    }
}

// Delete list
export const deleteList = async (listId) => {
    try {
        const response = await axios.delete(add + `/lists/${listId}`, { withCredentials: true })
        return response.data
    } catch (err) {
        console.error("Error deleting list:", err)
        throw err
    }
}

// add champion to list
export const addChamp = async (listId, champId) => {
    try {
        const response = await axios.post(add + `/lists/${listId}/champions`, { champion_id: champId})
        return response.data
    } catch (err) {
        if (err.response?.data?.message) {
            alert(err.response.data.message)
        } else {
            alert("Failed to add champion")
        }
        throw err
    }
}

// delete champion from list
export const removeChampFromList = async (listId, champId) => {
  try {
    const response = await axios.delete(add + `/lists/${listId}/champions`, {
      data: { champion_id: champId },
      withCredentials: true
    })
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error("Error removing champion from list:", err)
    throw err
  }
}