import axios from "axios"

const api = axios.create({          
    withCredentials: true,     // send cookies automatically
    headers: {
    "Content-Type": "application/json",
    }
})

export default api