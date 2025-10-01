import React, { useState, useContext, useEffect, createContext, useMemo } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Checking if user is logged in via session storage
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("user"))
        if (storedUser) setUser(storedUser)
        setLoading(false)
    }, [])

    // Login function
    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:3000/auth/login", {username, password})
            setUser(response.data.user)
            sessionStorage.setItem("user", JSON.stringify(response.data.user))
            return { success: true }
        } catch (err) {
            console.error("Login error:", err)
            return { success: false, message: "Login failed:" + err.response }
        }
    }

    // Logout Function
    const logout = () => {
        setUser(null)
        sessionStorage.removeItem("user")
    }

    const value = useMemo(() => ({
        user, 
        setUser, 
        isAuthenticated: !!user, 
        loading, 
        login, 
        logout,
    }), [user, loading, login, logout])

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)