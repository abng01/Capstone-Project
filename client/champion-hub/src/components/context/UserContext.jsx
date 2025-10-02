import React, { useState, useContext, useEffect, createContext, useMemo, useCallback } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const API_URL = import.meta.env.VITE_API_URL

    // Checking if user is logged in via session storage
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("user"))
        if (storedUser) setUser(storedUser)
        setLoading(false)
    }, [])

    // Login function
    const login = useCallback(async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {username, password}, {withCredentials: true})
            setUser(response.data.user)
            sessionStorage.setItem("user", JSON.stringify(response.data.user))
            return { success: true }
        } catch (err) {
            console.error("Login error:", err)
            return { success: false, message: "Login failed:" + err.response }
        }
    }, [API_URL])

    // Logout Function
    const logout = useCallback(() => {
        setUser(null)
        sessionStorage.removeItem("user")
    }, [])

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